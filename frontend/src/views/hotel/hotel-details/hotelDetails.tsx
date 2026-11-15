"use client";
import AppSwiper from '../../../components/app-swiper'
import type { Swiper as SwiperClass } from 'swiper'
import { img_path } from "../../../environment";
import React, { useState } from "react";
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import Reviews from '../../../components/reviews/reviews';
import StickyContent from './stickyContent';
import { DatePicker } from '../../../components/common-date-picker/appDatePicker'
import BannerCounter from "../../../components/banner-counter/counter";
import Lightbox from "yet-another-react-lightbox";
import RoomDetailModal from "../../../components/modals/roomDetailModal";
import { all_routes } from "../../../routes/all_routes";
const HotelDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const routes = all_routes
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [defaultDate] = useState(new Date());
    const [isPolicy,setIsPolicy] = useState(true);
    const [isPolicy2,setIsPolicy2] = useState(false);
    const [isPolicy3,setIsPolicy3] = useState(false);
    const [isPolicy4,setIsPolicy4] = useState(false);

    const [gallery, setGallery] = React.useState(false);
    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Hotel Details',
            active: false,
            link:routes.home1
        },
        {
            label: 'Hotel',
            active: false,
        },
        {
            label: 'Hotel Details',
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
    <Breadcrumb title="Tours" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-01" />
    <div className="content">
        <div className="container">

            <div className="row">

                {/* Hotel Details */}
                <div className="col-xl-8">

                    {/* Slider */}
                    <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                        <div className="mb-2">
                            <h4 className="mb-1 d-flex align-items-center flex-wrap">Hotel Miravent Barcelona<span className="badge badge-xs bg-success rounded-pill ms-2"><i className="isax isax-ticket-star me-1"></i>Verified</span></h4>
                            <div className="d-flex align-items-center flex-wrap">
                                <p className="fs-14 mb-2 me-3 pe-3 border-end"><i className="isax isax-buildings me-2"></i>Hotel</p>
                                <p className="fs-14 mb-2 me-3 pe-3 border-end"><i className="isax isax-location5 me-2"></i>Barcelona<Link href="#location" className="link-primary text-decoration-underline fw-medium ms-2">View Location</Link></p>
                                <div className="d-flex align-items-center mb-2">
                                    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.5</span>
                                    <p className="fs-14"><Link href="#reviews">(500 Reviews)</Link></p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <Link href="#" className="btn btn-outline-light btn-icon btn-sm d-flex align-items-center justify-content-center me-2"><i className="isax isax-share"></i></Link>
                            <Link href={routes.compare} className="btn btn-outline-light btn-sm d-inline-flex align-items-center me-2"><i className="isax isax-arrange-square me-1"></i>Compare</Link>
                            <Link href="#" className="btn btn-outline-light btn-sm d-inline-flex align-items-center"><i className="isax isax-heart5 text-danger me-1"></i>Save</Link>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
                        <div className="d-flex align-items-center flex-wrap">
                            <p className="fs-14 me-2 mb-2"><i className="isax isax-tick-circle5 text-success me-2"></i>Fully refundable</p>
                            <p className="fs-14 me-2 mb-2"><i className="isax isax-tick-circle5 text-success me-2"></i>Express check-in/out available</p>
                            <p className="fs-14 mb-2"><i className="isax isax-tick-circle5 text-success me-2"></i>Minimum check-in age: 18</p>
                        </div>
                        <span className="badge badge-light text-gray-9 badge-md fs-13 fw-medium rounded-pill mb-2">Total 48 Rooms </span>
                    </div>
                    <div className="border-bottom pb-4 mb-4">
                        <div className="service-wrap mb-4">
                            <div className="slider-wrap">
                                <AppSwiper preset="service-carousel" className="mb-4" thumbsSwiper={thumbsSwiper}>
                                    <div className="service-img">
                                        <ImageWithBasePath src="assets/img/hotels/hotel-large-01.jpg" className="img-fluid" alt="Slider Img" />
                                    </div>
                                    <div className="service-img">
                                        <ImageWithBasePath src="assets/img/hotels/hotel-large-02.jpg" className="img-fluid" alt="Slider Img" />
                                    </div>
                                    <div className="service-img">
                                        <ImageWithBasePath src="assets/img/hotels/hotel-large-03.jpg" className="img-fluid" alt="Slider Img" />
                                    </div>
                                    <div className="service-img">
                                        <ImageWithBasePath src="assets/img/hotels/hotel-large-04.jpg" className="img-fluid" alt="Slider Img" />
                                    </div>
                                    <div className="service-img">
                                        <ImageWithBasePath src="assets/img/hotels/hotel-large-05.jpg" className="img-fluid" alt="Slider Img" />
                                    </div>
                                    <div className="service-img">
                                        <ImageWithBasePath src="assets/img/hotels/hotel-large-06.jpg" className="img-fluid" alt="Slider Img" />
                                    </div>
                                </AppSwiper>
                                <Lightbox
                                    open={gallery}
                                    close={() => setGallery(false)}
                                    slides={[
                                        { src: `${img_path}assets/img/hotels/hotel-large-01.jpg` },
                                        { src: `${img_path}assets/img/hotels/hotel-large-02.jpg` },
                                        { src: `${img_path}assets/img/hotels/hotel-large-03.jpg` },
                                        { src: `${img_path}assets/img/hotels/hotel-large-04.jpg` },
                                        { src: `${img_path}assets/img/hotels/hotel-large-05.jpg` },
                                        { src: `${img_path}assets/img/hotels/hotel-large-06.jpg` },
                                    ]}
                                />
                                <Link
                                    data-fancybox="gallery"
                                    className="btn btn-white btn-xs view-btn"
                                    onClick={() => setGallery(true)} href="#" title="Demo 01"
                                >
                                    <i className="isax isax-image me-1" />
                                    See All
                                </Link>
                            </div>
                            <AppSwiper preset="slider-nav-thumbnails" onSwiper={setThumbsSwiper}>
                                <div><ImageWithBasePath src="assets/img/hotels/hotel-thumb-01.jpg" className="img-fluid" alt="Slider Img" /></div>
                                <div><ImageWithBasePath src="assets/img/hotels/hotel-thumb-02.jpg" className="img-fluid" alt="Slider Img" /></div>
                                <div><ImageWithBasePath src="assets/img/hotels/hotel-thumb-03.jpg" className="img-fluid" alt="Slider Img" /></div>
                                <div><ImageWithBasePath src="assets/img/hotels/hotel-thumb-04.jpg" className="img-fluid" alt="Slider Img" /></div>
                                <div><ImageWithBasePath src="assets/img/hotels/hotel-thumb-05.jpg" className="img-fluid" alt="Slider Img" /></div>
                                <div><ImageWithBasePath src="assets/img/hotels/hotel-thumb-06.jpg" className="img-fluid" alt="Slider Img" /></div>
                            </AppSwiper>
                        </div>
                        <h5 className="mb-3 fs-18">Description</h5>
                        <div>
                            <p>Hotel Miravent Barcelona is an excellent choice for travellers visiting Barcelona, offering a budget friendly environment alongside many helpful amenities designed to enhance your stay. The rooms offer a flat screen TV and air
                                conditioning
                            </p>
                        </div>
                        <div className="read-more">
                            <div className="more-text">
                                <p>and getting online is possible, as free internet access is available, allowing you to rest and refresh with ease.
                                </p>
                            </div>
                            <Link href="#" className="fs-14 fw-medium more-link text-decoration-underline mb-2">Show More</Link>
                        </div>
                    </div>
                    {/* /Slider */}

                    {/* Highlights */}
                    <div className="border-bottom pb-4 mb-4">
                        <h5 className="mb-3 fs-18">Highlights</h5>
                        <div className="highlight-box">
                            <p className="d-flex align-items-center"><i className="isax isax-star-1 text-orange"></i>Spacious Rooms: Comfortable accommodations with contemporary furnishings and high-quality bedding.</p>
                        </div>
                        <div className="highlight-box">
                            <p className="d-flex align-items-center"><i className="isax isax-star-1 text-orange"></i>Destination Unlocked: Programs that encourage exploration of local culture and attractions.</p>
                        </div>
                        <div className="highlight-box">
                            <p className="d-flex align-items-center"><i className="isax isax-star-1 text-orange"></i>Sophisticated Décor: Modern and artistic interiors with a touch of elegance.</p>
                        </div>
                    </div>
                    {/* /Highlights */}

                    {/* Popular Amenities */}
                    <div className="border-bottom pb-2 mb-4">
                        <h5 className="mb-3 fs-18">Popular Amenities</h5>
                        <div className="row">
                            <div className="col-sm-6 col-lg-4">
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-wind-2 fs-16"></i>
									</span>
                                    <p>Pool</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-coffee fs-16"></i>
									</span>
                                    <p>Coffee</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-shopping-bag fs-16"></i>
									</span>
                                    <p>Laundry Facilities</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-finger-scan fs-16"></i>
									</span>
                                    <p>In-Room Safe</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-airplane fs-16"></i>
									</span>
                                    <p>Airport Transfer</p>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-4">
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-diamonds fs-16"></i>
									</span>
                                    <p>Bar</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-health fs-16"></i>
									</span>
                                    <p>Fitness Facility</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-weight fs-16"></i>
									</span>
                                    <p>Gym</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-headphone fs-16"></i>
									</span>
                                    <p>24/7 Front Desk</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-reserve fs-16"></i>
									</span>
                                    <p>Free Breakfast</p>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-4">
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-buildings-2 fs-16"></i>
									</span>
                                    <p>Connecting Rooms</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-car fs-16"></i>
									</span>
                                    <p>Free Parking</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-mirroring-screen fs-16"></i>
									</span>
                                    <p>Television</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-airpod fs-16"></i>
									</span>
                                    <p>Air Conditioning</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-lovely fs-16"></i>
									</span>
                                    <p>Spa</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Popular Amenities */}

                    {/* Room types */}
                    <div className="border-bottom pb-2 mb-4">
                        <h5 className="mb-3 fs-18">Room types</h5>
                        <div className="row">
                            <div className="col-sm-6 col-lg-4">
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-send-sqaure-2 fs-16"></i>
									</span>
                                    <p>Smoking rooms</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-building fs-16"></i>
									</span>
                                    <p>City View</p>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-4">
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-diamonds fs-16"></i>
									</span>
                                    <p>Suite</p>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-4">
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-buildings-2 fs-16"></i>
									</span>
                                    <p>Connecting Rooms</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Room types */}

                    {/* Availability */}
                    <div className="border-bottom pb-2 mb-4" id="availability">
                        <h5 className="mb-3 fs-18">Availability</h5>
                        <div className="card">
                            <div className="card-body">
                                <div className="banner-form">
                                    <form className="d-lg-flex">
                                        <div className="d-flex form-info">
                                            <div className="form-item">
                                                <label className="form-label fs-14 text-default mb-1">Check In</label>
                                                <DatePicker 
                                                    className="form-control datetimepicker"
                                                    placeholder="dd/mm/yyyy"
                                                    defaultValue={defaultDate}
                                                    format="DD-MM-YYYY"
                                                />
                                            </div>
                                            <div className="form-item">
                                                <label className="form-label fs-14 text-default mb-1">Check Out</label>
                                                <DatePicker 
                                                    className="form-control datetimepicker"
                                                    placeholder="dd/mm/yyyy"
                                                    defaultValue={defaultDate}
                                                    format="DD-MM-YYYY"
                                                />
                                            </div>
                                            <div className="form-item dropdown">
                                                <div data-bs-toggle="dropdown" data-bs-auto-close="outside"  role="menu">
                                                    <label className="form-label fs-14 text-default mb-1">Guests</label>
                                                    <h5>4 <span className="fw-normal fs-14">Persons</span></h5>
                                                </div>
                                                <div className="dropdown-menu dropdown-menu-end dropdown-xl">
                                                    <h5 className="mb-3">Select Travelers &  Class</h5>
                                                    <div className="mb-3 border br-10 info-item pb-1">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="mb-3 d-flex align-items-center justify-content-between">
                                                                    <label className="form-label text-gray-9 mb-2">Rooms</label>
                                                                    <BannerCounter/>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="mb-3 d-flex align-items-center justify-content-between">
                                                                    <label className="form-label text-gray-9 mb-2">Adults</label>
                                                                    <BannerCounter/>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="mb-3 d-flex align-items-center justify-content-between">
                                                                    <label className="form-label text-gray-9 mb-2">Children <span className="text-default fw-normal">( 2-12 Yrs )</span></label>
                                                                    <BannerCounter/>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="mb-3 d-flex align-items-center justify-content-between">
                                                                    <label className="form-label text-gray-9 mb-2">Infants <span className="text-default fw-normal">( 0-12 Yrs )</span></label>
                                                                    <BannerCounter/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 border br-10 info-item pb-1">
                                                        <h6 className="fs-16 fw-medium mb-2">Travellers</h6>
                                                        <div className="d-flex align-items-center flex-wrap">
                                                            <div className="form-check me-3 mb-3">
                                                                <input className="form-check-input" type="radio" name="room" id="room1" defaultChecked />
                                                                <label className="form-check-label" htmlFor="room1">
                                                                    Single
                                                                </label>
                                                            </div>
                                                            <div className="form-check me-3 mb-3">
                                                                <input className="form-check-input" type="radio" name="room" id="room2" />
                                                                <label className="form-check-label" htmlFor="room2">
                                                                    Double
                                                                </label>
                                                            </div>
                                                            <div className="form-check me-3 mb-3">
                                                                <input className="form-check-input" type="radio" name="room" id="room3" />
                                                                <label className="form-check-label" htmlFor="room3">
                                                                    Delux
                                                                </label>
                                                            </div>
                                                            <div className="form-check mb-3">
                                                                <input className="form-check-input" type="radio" name="room" id="room4" />
                                                                <label className="form-check-label" htmlFor="room4">
                                                                    Suite
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 border br-10 info-item pb-1">
                                                        <h6 className="fs-16 fw-medium mb-2">Property Type</h6>
                                                        <div className="d-flex align-items-center flex-wrap">
                                                            <div className="form-check me-3 mb-3">
                                                                <input className="form-check-input" type="radio" name="property" id="property1" defaultChecked />
                                                                <label className="form-check-label" htmlFor="property1">
                                                                    Villa
                                                                </label>
                                                            </div>
                                                            <div className="form-check me-3 mb-3">
                                                                <input className="form-check-input" type="radio" name="property" id="property2" />
                                                                <label className="form-check-label" htmlFor="property2">
                                                                    Condo
                                                                </label>
                                                            </div>
                                                            <div className="form-check me-3 mb-3">
                                                                <input className="form-check-input" type="radio" name="property" id="property3" />
                                                                <label className="form-check-label" htmlFor="property3">
                                                                    Cabin
                                                                </label>
                                                            </div>
                                                            <div className="form-check mb-3">
                                                                <input className="form-check-input" type="radio" name="property" id="property4" />
                                                                <label className="form-check-label" htmlFor="property4">
                                                                    Apartments
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-end">
                                                        <Link href="#" className="btn btn-light btn-sm me-2">Cancel</Link>
                                                        <button type="button" className="btn btn-primary btn-sm">Apply</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-item dropdown">
                                                <div data-bs-toggle="dropdown" data-bs-auto-close="outside"  role="menu">
                                                    <label className="form-label fs-14 text-default mb-1">Price per Night</label>
                                                    <input type="text" className="form-control" defaultValue="$1000 - $15000" />
                                                </div>
                                                <div className="dropdown-menu dropdown-md p-0">
                                                    <ul>
                                                        <li className="border-bottom">
                                                            <Link className="dropdown-item" href="#">
                                                                <h6 className="fs-16 fw-medium">$500 - $2000</h6>
                                                                <p>Upto 65% offers</p>
                                                            </Link>
                                                        </li>
                                                        <li className="border-bottom">
                                                            <Link className="dropdown-item" href="#">
                                                                <h6 className="fs-16 fw-medium">Upto 65% offers</h6>
                                                                <p>Upto 40% offers</p>
                                                            </Link>
                                                        </li>
                                                        <li className="border-bottom">
                                                            <Link className="dropdown-item" href="#">
                                                                <h6 className="fs-16 fw-medium">$5000 - $8000</h6>
                                                                <p>Upto 35% offers</p>
                                                            </Link>
                                                        </li>
                                                        <li className="border-bottom">
                                                            <Link className="dropdown-item" href="#">
                                                                <h6 className="fs-16 fw-medium">$9000 - $11000</h6>
                                                                <p>Upto 20% offers</p>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="dropdown-item" href="#">
                                                                <h6 className="fs-16 fw-medium">$11000 - $15000</h6>
                                                                <p>Upto 10% offers</p>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" className="btn btn-primary search-btn rounded">Search</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="hotel-list">
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
                                                <ImageWithBasePath src="assets/img/hotels/hotel-03.jpg" className="img-fluid" alt="img" />
                                            </Link>
                                        </div>
                                        </AppSwiper>
                                    <div className="fav-item" key={1} onClick={() => handleItemClick(1)}>
                                        <span className="badge bg-pink">Popular</span>
                                        <Link href="#"className={`fav-icon ${selectedItems[1] ? 'selected' : ''}`}>
                                            <i className="isax isax-heart5"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="place-content pb-1">
                                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                                        <div className="overflow-hidden">
                                            <h5 className="mb-2 d-inline-flex align-items-center text-truncate"><Link href={routes.hotelDetails}>Superior Twin</Link><span className="badge badge-xs badge-success rounded-pill ms-2">19% Offer</span></h5>
                                        </div>
                                        <div className="d-flex align-items-center text-nowrap mb-2">
                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.3</span>
                                            <p className="fs-14">(500 Reviews)</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap">
                                        <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">Sleeps 2</span>
                                        <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">1 Queen Bed</span>
                                        <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">City View </span>
                                        <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">15 m²</span>
                                        <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">Free WiFi</span>
                                        <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">Private Safe</span>
                                        <span className="badge badge-info-100 fs-10 fw-medium rounded-pill mb-2">Free Self Parking</span>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap">
                                        <p className="me-2 mb-2 d-inline-flex align-items-center"><i className="isax isax-tick-circle5 text-success me-2"></i>Refundable</p>
                                        <p className="mb-2 d-inline-flex align-items-center"><i className="isax isax-tick-circle5 text-success me-2"></i>Express check-in/out available</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                        <h5 className="text-primary me-2 mb-3">$500 <span className="text-default text-decoration-line-through">$128</span> <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                        <div className="d-flex align-items-center">
                                            <Link href="#" data-bs-toggle="modal" data-bs-target="#room-details" className="fs-14 link-primary text-decoration-underline me-3 mb-3">View Room Details</Link>
                                            <div className="btn btn-primary btn-md mb-3">
                                                <div className="form-check d-flex align-items-center ps-0">
                                                    <input className="form-check-input ms-0 mt-0 border border-white" name="book" type="checkbox" id="book1" defaultChecked />
                                                    <label className="form-check-label fs-13 text-white ms-2" htmlFor="book1">Select Room</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="place-item mb-4">
                                <div className="place-img">
                                    <Link href={routes.hotelDetails}>
                                        <ImageWithBasePath src="assets/img/hotels/hotel-02.jpg" className="img-fluid" alt="img" />
                                    </Link>
                                    <div className="fav-item justify-content-end" key={2} onClick={() => handleItemClick(2)}>
                                        <Link href="#" className={`fav-icon ${selectedItems[2] ? 'selected' : ''}`}>
                                            <i className="isax isax-heart5"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="place-content pb-1">
                                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                                        <div className="overflow-hidden">
                                            <h5 className="mb-2 d-inline-flex align-items-center text-truncate"><Link href={routes.hotelDetails}>Classic Double</Link></h5>
                                        </div>
                                        <div className="d-flex align-items-center text-nowrap mb-2">
                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.9</span>
                                            <p className="fs-14">(380 Reviews)</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap">
                                        <p className="me-2 mb-2 d-inline-flex align-items-center"><i className="isax isax-tick-circle5 text-success me-2"></i>Reserve now, pay later</p>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap mb-2">
                                        <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">Sleeps 6</span>
                                        <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">2 King Beds</span>
                                        <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">Family Room</span>
                                        <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">23 m²</span>
                                        <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">2 Bathrooms</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                        <h5 className="text-primary me-2 mb-3">$700 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                        <div className="d-flex align-items-center">
                                            <Link href="#" data-bs-toggle="modal" data-bs-target="#room-details" className="fs-14 link-primary text-decoration-underline me-3 mb-3">View Room Details</Link>
                                            <div className="btn btn-primary btn-md mb-3">
                                                <div className="form-check d-flex align-items-center ps-0">
                                                    <input className="form-check-input ms-0 mt-0 border border-white" name="book" type="checkbox" id="book2" />
                                                    <label className="form-check-label fs-13 text-white ms-2" htmlFor="book2">Select Room</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="place-item mb-4">
                                <div className="place-img">
                                    <Link href={routes.hotelDetails}>
                                        <ImageWithBasePath src="assets/img/hotels/hotel-03.jpg" className="img-fluid" alt="img" />
                                    </Link>
                                    <div className="fav-item justify-content-end" key={3} onClick={() => handleItemClick(3)}>
                                        <Link href="#" className={`fav-icon ${selectedItems[3] ? 'selected' : ''}`}>
                                            <i className="isax isax-heart5"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="place-content pb-1">
                                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                                        <div className="overflow-hidden">
                                            <h5 className="mb-2 d-inline-flex align-items-center text-truncate"><Link href={routes.hotelDetails}>Executive Suite 1Bedroom</Link></h5>
                                        </div>
                                        <div className="d-flex align-items-center text-nowrap mb-2">
                                            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.9</span>
                                            <p className="fs-14">(380 Reviews)</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap">
                                        <p className="me-2 mb-2 d-inline-flex align-items-center"><i className="isax isax-tick-circle5 text-success me-2"></i>Reserve now, pay later</p>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap mb-2">
                                        <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">Sleeps 3</span>
                                        <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">1 Bed</span>
                                        <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">Family Room</span>
                                        <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">35 m²</span>
                                        <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">Free WiFi</span>
                                        <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">Private Safe</span>
                                        <span className="badge badge-info-100 fs-10 fw-medium rounded-pill mb-2">Free Parking</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                        <h5 className="text-primary me-2 mb-3">$450 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                        <div className="d-flex align-items-center">
                                            <Link href="#" data-bs-toggle="modal" data-bs-target="#room-details" className="fs-14 link-primary text-decoration-underline me-3 mb-3">View Room Details</Link>
                                            <div className="btn btn-primary btn-md mb-3">
                                                <div className="form-check d-flex align-items-center ps-0">
                                                    <input className="form-check-input ms-0 mt-0 border border-white" name="book" type="checkbox" id="book3" />
                                                    <label className="form-check-label fs-13 text-white ms-2" htmlFor="book3">Select Room</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Availability */}

                    {/* Services */}
                    <div className="border-bottom pb-2 mb-4">
                        <h5 className="mb-3 fs-18">Services</h5>
                        <div className="row">
                            <div className="col-md-6 col-lg-4">
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-verify fs-16"></i>
									</span>
                                    <p>Concierge Services</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-verify fs-16"></i>
									</span>
                                    <p>Daily Housekeeping</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-verify fs-16"></i>
									</span>
                                    <p>Front Desk Services</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-verify fs-16"></i>
									</span>
                                    <p> Check-In/Check-Out Assistance</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-verify fs-16"></i>
									</span>
                                    <p>On-Site Restaurants</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-verify fs-16"></i>
									</span>
                                    <p>In-Room Dining</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-verify fs-16"></i>
									</span>
                                    <p>Concierge Services</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-verify fs-16"></i>
									</span>
                                    <p>Valet Parking</p>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
										<i className="isax isax-verify fs-16"></i>
									</span>
                                    <p>Baby Sitting</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Services */}

                    {/* Gallery */}
                    <div className="border-bottom pb-4 mb-4">
                        <h5 className="mb-3 fs-18">Gallery</h5>
                        <Lightbox
                            open={open}
                            close={() => setOpen(false)}
                            slides={[
                            { src: `${img_path}assets/img/hotels/hotel-large-07.jpg` },
                            { src: `${img_path}assets/img/hotels/hotel-large-08.jpg` },
                            { src: `${img_path}assets/img/hotels/hotel-large-09.jpg` },
                            { src: `${img_path}assets/img/hotels/hotel-large-10.jpg` },
                            { src: `${img_path}assets/img/hotels/hotel-large-11.jpg` },
                            { src: `${img_path}assets/img/hotels/hotel-large-12.jpg` },
                            { src: `${img_path}assets/img/hotels/hotel-large-13.jpg` },
                            { src: `${img_path}assets/img/hotels/hotel-large-14.jpg` },
                            { src: `${img_path}assets/img/hotels/hotel-large-15.jpg` },
                            { src: `${img_path}assets/img/hotels/hotel-large-16.jpg` },
                            { src: `${img_path}assets/img/hotels/hotel-large-17.jpg` },
                            { src: `${img_path}assets/img/hotels/hotel-large-08.jpg` },
                            ]}
                        />
                        <div className="row row-cols-lg-6 row-cols-sm-4 row-cols-2 g-2">
                            <div className="col">
                                <Link className="galley-wrap" data-fancybox="gallery" href="#" onClick={() => setOpen(true)}>
                                    <ImageWithBasePath src="assets/img/hotels/hotel-gallery-01.jpg" alt="img"/>
                                </Link>
                            </div>
                            <div className="col">
                                <Link className="galley-wrap" data-fancybox="gallery" href="#" onClick={() => setOpen(true)}>
                                    <ImageWithBasePath src="assets/img/hotels/hotel-gallery-02.jpg" alt="img"/>
                                </Link>
                            </div>
                            <div className="col">
                                <Link className="galley-wrap" data-fancybox="gallery" href="#" onClick={() => setOpen(true)}>
                                    <ImageWithBasePath src="assets/img/hotels/hotel-gallery-03.jpg" alt="img"/>
                                </Link>
                            </div>
                            <div className="col">
                                <Link className="galley-wrap" data-fancybox="gallery" href="#" onClick={() => setOpen(true)}>
                                    <ImageWithBasePath src="assets/img/hotels/hotel-gallery-04.jpg" alt="img"/>
                                </Link>
                            </div>
                            <div className="col">
                                <Link className="galley-wrap" data-fancybox="gallery" href="#" onClick={() => setOpen(true)}>
                                    <ImageWithBasePath src="assets/img/hotels/hotel-gallery-05.jpg" alt="img"/>
                                </Link>
                            </div>
                            <div className="col">
                                <Link className="galley-wrap" data-fancybox="gallery" href="#" onClick={() => setOpen(true)}>
                                    <ImageWithBasePath src="assets/img/hotels/hotel-gallery-06.jpg" alt="img"/>
                                </Link>
                            </div>
                            <div className="col">
                                <Link className="galley-wrap" data-fancybox="gallery" href="#" onClick={() => setOpen(true)}>
                                    <ImageWithBasePath src="assets/img/hotels/hotel-gallery-07.jpg" alt="img"/>
                                </Link>
                            </div>
                            <div className="col">
                                <Link className="galley-wrap" data-fancybox="gallery" href="#" onClick={() => setOpen(true)}>
                                    <ImageWithBasePath src="assets/img/hotels/hotel-gallery-08.jpg" alt="img"/>
                                </Link>
                            </div>
                            <div className="col">
                                <Link className="galley-wrap" data-fancybox="gallery" href="#" onClick={() => setOpen(true)}>
                                    <ImageWithBasePath src="assets/img/hotels/hotel-gallery-09.jpg" alt="img"/>
                                </Link>
                            </div>
                            <div className="col">
                                <Link className="galley-wrap" data-fancybox="gallery" href="#" onClick={() => setOpen(true)}>
                                    <ImageWithBasePath src="assets/img/hotels/hotel-gallery-10.jpg" alt="img"/>
                                </Link>
                            </div>
                            <div className="col">
                                <Link className="galley-wrap" data-fancybox="gallery" href="#" onClick={() => setOpen(true)}>
                                    <ImageWithBasePath src="assets/img/hotels/hotel-gallery-11.jpg" alt="img"/>
                                </Link>
                            </div>
                            <div className="col">
                                <div className="galley-wrap more-gallery d-flex align-items-center justify-content-center">
                                    <Link data-fancybox="gallery" href="#" onClick={() => setOpen(true)} className="btn btn-white btn-xs"><i className="isax isax-image5 me-1"></i>See All</Link>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    {/* /Gallery */}

                    {/* Hotel Rules */}
                    <div className="border-bottom pb-2 mb-4">
                        <h5 className="mb-3 fs-18">Hotel Rules</h5>
                        <div className="card shadow-none mb-3">
                            <div className="card-body p-3 pb-0">
                                <h6 className="fw-medium mb-3">Check-In / Check-Out Policy</h6>
                                <div className="d-flex align-items-center">
                                    <div className="d-flex align-items-center me-4 mb-3">
                                        <i className="isax isax-clock fs-24 text-gray-9"></i>
                                        <div className="ms-2">
                                            <p className="mb-1">Check In</p>
                                            <h6>09:00 AM</h6>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <i className="isax isax-clock fs-24 text-gray-9"></i>
                                        <div className="ms-2">
                                            <p className="mb-1">Check Out</p>
                                            <h6>09:00 PM</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`policy-wrap p-3 pb-2 mb-3 ${isPolicy ? '' : 'expanded'}`}>
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <h6 className="fw-medium mb-2">Guarantee Policy</h6>
                                <Link href="#" onClick={()=>setIsPolicy(!isPolicy)} className="fs-14 fw-medium text-decoration-underline toggle-btn mb-2">{isPolicy ? 'Show Less':'Show More'}</Link>
                            </div>
                            <div className="policy-info pb-2" style={{display:isPolicy?'block':'none'}}>
                                <p className="mb-0">- A valid credit card will be required upon booking;</p>
                                <p className="mb-0">- For credit card reservations, the same card(s) must be presented upon check in at the respective hotels;</p>
                                <p className="mb-0">- Management reserves the right to cancel any reservations without notice if we are notified of any fraud or illegal activities associated with the full payments received.</p>
                            </div>
                        </div>
                        <div className={`policy-wrap p-3 pb-2 mb-3 ${isPolicy2 ? '' : 'expanded'}`}>
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <h6 className="fw-medium mb-2">Children Policy</h6>
                                <Link href="#" onClick={()=>setIsPolicy2(!isPolicy2)} className="fs-14 fw-medium text-decoration-underline toggle-btn mb-2">{isPolicy2 ? 'Show Less':'Show More'}</Link>
                            </div>
                            <div className="policy-info pb-2 hide" style={{display:isPolicy2?'block':'none'}}>
                                <p className="mb-0">- A valid credit card will be required upon booking;</p>
                                <p className="mb-0">- For credit card reservations, the same card(s) must be presented upon check in at the respective hotels;</p>
                                <p className="mb-0">- Management reserves the right to cancel any reservations without notice if we are notified of any fraud or illegal activities associated with the full payments received.</p>
                            </div>
                        </div>
                        <div className={`policy-wrap p-3 pb-2 mb-3 ${isPolicy3 ? '' : 'expanded'}`}>
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <h6 className="fw-medium mb-2">Cancellation/Amendment Policy</h6>
                                <Link href="#" onClick={()=>setIsPolicy3(!isPolicy3)} className="fs-14 fw-medium text-decoration-underline toggle-btn mb-2">{isPolicy3 ? 'Show Less':'Show More'}</Link>
                            </div>
                            <div className="policy-info pb-2 hide" style={{display:isPolicy3?'block':'none'}}>
                                <p className="mb-0">- A valid credit card will be required upon booking;</p>
                                <p className="mb-0">- For credit card reservations, the same card(s) must be presented upon check in at the respective hotels;</p>
                                <p className="mb-0">- Management reserves the right to cancel any reservations without notice if we are notified of any fraud or illegal activities associated with the full payments received.</p>
                            </div>
                        </div>
                        <div className={`policy-wrap p-3 pb-2 mb-3 ${isPolicy4 ? '' : 'expanded'}`}>
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <h6 className="fw-medium mb-2">Late check-out Policy</h6>
                                <Link href="#" onClick={()=>setIsPolicy4(!isPolicy4)} className="fs-14 fw-medium text-decoration-underline toggle-btn mb-2">{isPolicy4 ? 'Show Less':'Show More'}</Link>
                            </div>
                            <div className="policy-info pb-2 hide" style={{display:isPolicy4?'block':'none'}}>
                                <p className="mb-0">- A valid credit card will be required upon booking;</p>
                                <p className="mb-0">- For credit card reservations, the same card(s) must be presented upon check in at the respective hotels;</p>
                                <p className="mb-0">- Management reserves the right to cancel any reservations without notice if we are notified of any fraud or illegal activities associated with the full payments received.</p>
                            </div>
                        </div>
                    </div>
                    {/* /Hotel Rules */}

                    {/* Services */}
                    <div className="border-bottom pb-2 mb-4">
                        <h5 className="mb-3 fs-18">Services</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <p className="d-flex align-items-center mb-3"><i className="isax isax-magic-star fs-14 me-2"></i>Wheelchair accessible</p>
                                <p className="d-flex align-items-center mb-3"><i className="isax isax-magic-star fs-14 me-2"></i>Visual alarms in hallways</p>
                                <p className="d-flex align-items-center mb-3"><i className="isax isax-magic-star fs-14 me-2"></i>Wheelchair-accessible gym</p>
                                <p className="d-flex align-items-center mb-3"><i className="isax isax-magic-star fs-14 me-2"></i>Elevator</p>
                            </div>
                            <div className="col-md-6">
                                <p className="d-flex align-items-center mb-3"><i className="isax isax-magic-star fs-14 me-2"></i>Braille/raised signage</p>
                                <p className="d-flex align-items-center mb-3"><i className="isax isax-magic-star fs-14 me-2"></i>Wheelchair-accessible business center</p>
                                <p className="d-flex align-items-center mb-3"><i className="isax isax-magic-star fs-14 me-2"></i>Wheelchair-accessible lounge</p>
                                <p className="d-flex align-items-center mb-3"><i className="isax isax-magic-star fs-14 me-2"></i>Wheelchair-accessible concierge desk</p>
                            </div>
                        </div>
                    </div>
                    {/* /Services */}

                    {/* Frequently Asked Questions */}
                    <div className="border-bottom pb-3 mb-4">
                        <h5 className="mb-3 fs-18">Frequently Asked Questions</h5>
                        <div className="accordion faq-accordion" id="accordionFaq">
                            <div className="accordion-item show mb-2">
                                <h2 className="accordion-header">
									<button className="accordion-button fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapseOne"  aria-controls="faq-collapseOne">
										Does offer free cancellation for a full refund?
									</button>
								</h2>
                                <div id="faq-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFaq">
                                    <div className="accordion-body">
                                        <p className="mb-0">Does have fully refundable room rates available to book on our site. If you’ve booked a fully refundable room rate, this can be cancelled up to a few days before check-in depending on the property's cancellation policy. Just make sure to check this property's cancellation policy for the exact terms and conditions.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item mb-2">
                                <h2 className="accordion-header">
									<button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-two"  aria-controls="faq-two">
										Is there a pool?
									</button>
								</h2>
                                <div id="faq-two" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                    <div className="accordion-body">
                                        <p className="mb-0">Does have fully refundable room rates available to book on our site. If you’ve booked a fully refundable room rate, this can be cancelled up to a few days before check-in depending on the property's cancellation  policy. Just make sure to check this property's cancellation policy for the exact terms and conditions.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item mb-2">
                                <h2 className="accordion-header">
									<button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-three"  aria-controls="faq-three">
										Are pets allowed?
									</button>
								</h2>
                                <div id="faq-three" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                    <div className="accordion-body">
                                        <p className="mb-0">Does have fully refundable room rates available to book on our site. If you’ve booked a fully refundable room rate, this can be cancelled up to a few days before check-in depending on the property's cancellation  policy. Just make sure to check this property's cancellation policy for the exact terms and conditions.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item mb-2">
                                <h2 className="accordion-header">
									<button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-four"  aria-controls="faq-four">
										Is airport shuttle service offered?
									</button>
								</h2>
                                <div id="faq-four" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                    <div className="accordion-body">
                                        <p className="mb-0">Does have fully refundable room rates available to book on our site. If you’ve booked a fully refundable room rate, this can be cancelled up to a few days before check-in depending on the property's cancellation  policy. Just make sure to check this property's cancellation policy for the exact terms and conditions.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item mb-2">
                                <h2 className="accordion-header">
									<button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-five"  aria-controls="faq-five">
										What are the check-in and check-out times?
									</button>
								</h2>
                                <div id="faq-five" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                    <div className="accordion-body">
                                        <p className="mb-0">Does have fully refundable room rates available to book on our site. If you’ve booked a fully refundable room rate, this can be cancelled up to a few days before check-in depending on the property's cancellation policy. Just make sure to check this property's cancellation policy for the exact terms and conditions.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Frequently Asked Questions */}

                    <Reviews/>
                    <Lightbox
                            open={open2}
                            close={() => setOpen2(false)}
                            slides={[
                            { src: `${img_path}assets/img/hotels/hotel-large-01.jpg` },
                            { src: `${img_path}assets/img/hotels/hotel-large-02.jpg` },
                            { src: `${img_path}assets/img/hotels/hotel-large-03.jpg` },
                            { src: `${img_path}assets/img/hotels/hotel-large-04.jpg` },
                            { src: `${img_path}assets/img/hotels/hotel-large-05.jpg` },
                            { src: `${img_path}assets/img/hotels/hotel-large-06.jpg` },
                            ]}
                        />
                </div>
                {/* /Hotel Details */}

                {/* Sidebar Details */}
                <div className="col-xl-4 ">

                    <StickyContent/>

                </div>
                {/* /Sidebar Details */}

            </div>
        </div>
    </div>
    <RoomDetailModal/>
    </>
  )
}

export default HotelDetails