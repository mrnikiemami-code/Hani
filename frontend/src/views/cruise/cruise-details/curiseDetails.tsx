"use client";
import AppSwiper from '../../../components/app-swiper'
import type { Swiper as SwiperClass } from 'swiper'
import { img_path } from "../../../environment";
import React, { useState } from 'react'
import Breadcrumb from '../../../components/breadcrumb/breadcrumb'
import { all_routes } from '../../../routes/all_routes';
import CruiseInfo from './cruise-info';
import ImageWithBasePath from '../../../components/image-with-base-path';
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import Reviews from '../../../components/reviews/reviews';
import VideoModal from '../../../components/video-modal/videoModal';

interface ItineraryDay {
    step: string;
    title: string;
    time: string;
    image: string;
    description: string;
}

const itineraryDays: ItineraryDay[] = [
    {
        step: '01',
        title: 'Day 1, Embarkation in Barcelona',
        time: '15 May 2025, 02:00 PM',
        image: 'assets/img/cruise/cruise-16.jpg',
        description: 'Check-in opens at the Port of Barcelona cruise terminal from 12:00. After the muster drill the ship sails at 18:00, with dinner served in the main dining room as the Catalan coast falls away.',
    },
    {
        step: '02',
        title: 'Day 2, Palma de Mallorca',
        time: '16 May 2025, 08:00 AM',
        image: 'assets/img/cruise/cruise-17.jpg',
        description: 'Alongside from 08:00 to 18:00. Shore excursions include the Gothic cathedral and old town on foot, or a half-day drive through the Serra de Tramuntana terraces.',
    },
    {
        step: '03',
        title: 'Day 3, At Sea',
        time: '17 May 2025, All day',
        image: 'assets/img/cruise/cruise-18.jpg',
        description: 'A full day at sea. The spa, pools and sports deck are open throughout, with a wine tasting at 16:00 and the first formal night in the main dining room.',
    },
    {
        step: '04',
        title: 'Day 4, Marseille',
        time: '18 May 2025, 07:00 AM',
        image: 'assets/img/cruise/cruise-19.jpg',
        description: 'Alongside from 07:00 to 17:00. Excursions run to the Calanques by boat, or inland to Aix-en-Provence and its morning market.',
    },
    {
        step: '05',
        title: 'Day 5, Genoa',
        time: '19 May 2025, 08:00 AM',
        image: 'assets/img/cruise/cruise-20.jpg',
        description: 'Alongside from 08:00 to 18:00. Walk the caruggi of the old port, or take the coastal excursion to Portofino and Santa Margherita Ligure.',
    },
    {
        step: '06',
        title: 'Day 6, Naples',
        time: '20 May 2025, 07:00 AM',
        image: 'assets/img/cruise/cruise-21.jpg',
        description: 'Alongside from 07:00 to 19:00. The full-day excursion covers Pompeii and Vesuvius; the shorter option follows the Amalfi coast road to Positano.',
    },
    {
        step: '07',
        title: 'Day 7, Disembarkation in Barcelona',
        time: '21 May 2025, 07:00 AM',
        image: 'assets/img/cruise/cruise-22.jpg',
        description: 'The ship berths at 07:00. Breakfast is served from 06:00 and disembarkation runs by luggage tag colour, with all guests ashore by 10:00.',
    },
];

const CruiseDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const routes = all_routes
    const [showModal, setShowModal] = useState(false);
    const videoUrl = 'https://www.youtube.com/watch?v=4fMuE_t5YL4';

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const [gallery, setGallery] = React.useState(false);
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
            label: 'Cruise Details',
            active: true,
        },
    ];
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);



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
            <Breadcrumb
                title="Cruise"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-06"
            />
            <div className="content">
                <div className="container">

                    <div className="row">

                        <div className="col-xl-8">

                            {/* Slider */}
                            <div>
                                <div className="service-wrap slider-wrap-four mb-4">
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <div className="mb-2">
                                            <h4 className="mb-1 d-flex align-items-center flex-wrap">Coral Cruiser<span className="badge badge-xs bg-success rounded-pill ms-2"><i className="isax isax-ticket-star me-1"></i>Verified</span></h4>
                                            <div className="d-flex align-items-center flex-wrap">
                                                <p className="fs-14 mb-2 me-3 pe-3 border-end"><i className="isax isax-ship me-2"></i>Luxury Cruise</p>
                                                <p className="fs-14 mb-2 me-3 pe-3 border-end"><i className="isax isax-location5 me-2"></i>Ciutat Vella, Barcelona<Link href="#" className="link-primary text-decoration-underline fw-medium ms-2">View Location</Link></p>
                                                <div className="d-flex align-items-center mb-2">
                                                    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">5.0</span>
                                                    <p className="fs-14"><Link href="#">(400 Reviews)</Link></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center mb-3">
                                            <Link href="#" className="btn btn-outline-light btn-icon btn-sm d-flex align-items-center justify-content-center me-2"><i className="isax isax-share"></i></Link>
                                            <Link href="#" className="btn btn-outline-light btn-sm d-inline-flex align-items-center"><i className="isax isax-heart5 text-danger me-1"></i>Save</Link>
                                        </div>
                                    </div>
                                    <div className="service-wrap mb-4">
                                        <div className="slider-wrap">
                                            <AppSwiper preset="service-carousel" className="mb-4" thumbsSwiper={thumbsSwiper}>
                                                <div className="service-img">
                                                    <ImageWithBasePath src="assets/img/cruise/cruise-large-01.jpg" className="img-fluid" alt="Slider Img" />
                                                </div>
                                                <div className="service-img">
                                                    <ImageWithBasePath src="assets/img/cruise/cruise-large-02.jpg" className="img-fluid" alt="Slider Img" />
                                                </div>
                                                <div className="service-img">
                                                    <ImageWithBasePath src="assets/img/cruise/cruise-large-03.jpg" className="img-fluid" alt="Slider Img" />
                                                </div>
                                                <div className="service-img">
                                                    <ImageWithBasePath src="assets/img/cruise/cruise-large-04.jpg" className="img-fluid" alt="Slider Img" />
                                                </div>
                                                <div className="service-img">
                                                    <ImageWithBasePath src="assets/img/cruise/cruise-large-05.jpg" className="img-fluid" alt="Slider Img" />
                                                </div>
                                                <div className="service-img">
                                                    <ImageWithBasePath src="assets/img/cruise/cruise-large-06.jpg" className="img-fluid" alt="Slider Img" />
                                                </div>
                                            </AppSwiper>
                                            <Lightbox
                                                open={gallery}
                                                close={() => setGallery(false)}
                                                slides={[
                                                    { src: `${img_path}assets/img/cruise/cruise-large-01.jpg` },
                                                    { src: `${img_path}assets/img/cruise/cruise-large-02.jpg` },
                                                    { src: `${img_path}assets/img/cruise/cruise-large-03.jpg` },
                                                    { src: `${img_path}assets/img/cruise/cruise-large-04.jpg` },
                                                    { src: `${img_path}assets/img/cruise/cruise-large-05.jpg` },
                                                    { src: `${img_path}assets/img/cruise/cruise-large-06.jpg` },
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
                                            <div><ImageWithBasePath src="assets/img/cruise/cruise-thumb-01.jpg" className="img-fluid" alt="Slider Img" /></div>
                                            <div><ImageWithBasePath src="assets/img/cruise/cruise-thumb-02.jpg" className="img-fluid" alt="Slider Img" /></div>
                                            <div><ImageWithBasePath src="assets/img/cruise/cruise-thumb-03.jpg" className="img-fluid" alt="Slider Img" /></div>
                                            <div><ImageWithBasePath src="assets/img/cruise/cruise-thumb-04.jpg" className="img-fluid" alt="Slider Img" /></div>
                                            <div><ImageWithBasePath src="assets/img/cruise/cruise-thumb-05.jpg" className="img-fluid" alt="Slider Img" /></div>
                                            <div><ImageWithBasePath src="assets/img/cruise/cruise-thumb-06.jpg" className="img-fluid" alt="Slider Img" /></div>
                                        </AppSwiper>
                                    </div>
                                </div>
                            </div>
                            {/* /Slider */}
                            <div className="accordion custom-accordion accordion-shadow">
                                <div className="accordion-item border-0 mb-4">
                                    <div className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_two" aria-expanded="true">
                                            Description
                                        </button>
                                    </div>
                                    <div id="accordion_collapse_two" className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            <p className="mb-2">A six-night Western Mediterranean voyage aboard the Coral Cruiser, sailing round trip from Barcelona. The route calls at Palma de Mallorca, Marseille, Genoa and Naples, with one full day at sea before returning to the embarkation port.
                                            </p>
                                            <Link href="#" className="fs-14 fw-medium text-decoration-underline mb-2">Show More</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0 mb-4">
                                    <div className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_one" aria-expanded="true">
                                            Details
                                        </button>
                                    </div>
                                    <div id="accordion_collapse_one" className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            <div className="row gy-3">
                                                <div className="col-md-6 col-lg-4">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-timer fs-16"></i>
                                                        </span>
                                                        <div>
                                                            <h6 className="mb-1">Duration</h6>
                                                            <span>6 nights</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-profile-2user fs-16"></i>
                                                        </span>
                                                        <div>
                                                            <h6 className="mb-1">No of Guests</h6>
                                                            <span>569</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4">
                                                    <div className="d-flex align-items-center">
                                                        <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                            <i className="isax isax-calendar fs-16"></i>
                                                        </span>
                                                        <div>
                                                            <h6 className="mb-1">Date</h6>
                                                            <span>15 May - 21 May 2025</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4 border-0">
                                    <div className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_three" aria-expanded="true">
                                            Cruise Amenities
                                        </button>
                                    </div>
                                    <div id="accordion_collapse_three" className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            <div className="row gy-3">
                                                <div className="col-lg-4 col-md-6">
                                                    <div>
                                                        <h6 className="mb-2">Dining Options</h6>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <i className="isax isax-verify text-primary me-2 fs-16"></i>
                                                            <p>Room Service</p>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <i className="isax isax-verify text-primary me-2 fs-16"></i>
                                                            <p>Cafés and Bakeries</p>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <i className="isax isax-verify text-primary me-2 fs-16"></i>
                                                            <p>Specialty Restaurants</p>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-0">
                                                            <i className="isax isax-verify text-primary me-2 fs-16"></i>
                                                            <p>Buffet Restaurants</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div>
                                                        <h6 className="mb-2">Entertainment</h6>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <i className="isax isax-verify text-primary me-2 fs-16"></i>
                                                            <p>Live Shows</p>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <i className="isax isax-verify text-primary me-2 fs-16"></i>
                                                            <p>Movie Theaters</p>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <i className="isax isax-verify text-primary me-2 fs-16"></i>
                                                            <p>Nightclubs & Bars</p>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-0">
                                                            <i className="isax isax-verify text-primary me-2 fs-16"></i>
                                                            <p>Casino</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div>
                                                        <h6 className="mb-2">Sports & Fitness</h6>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <i className="isax isax-verify text-primary me-2 fs-16"></i>
                                                            <p>Pools</p>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <i className="isax isax-verify text-primary me-2 fs-16"></i>
                                                            <p>Fitness Centers</p>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <i className="isax isax-verify text-primary me-2 fs-16"></i>
                                                            <p>Sports Courts</p>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-0">
                                                            <i className="isax isax-verify text-primary me-2 fs-16"></i>
                                                            <p>Rock Climbing Walls</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div>
                                                        <h6 className="mb-2">Wellness & Relaxation</h6>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <i className="isax isax-verify text-primary me-2 fs-16"></i>
                                                            <p>Spas</p>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <i className="isax isax-verify text-primary me-2 fs-16"></i>
                                                            <p>Thermal Suites</p>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-0">
                                                            <i className="isax isax-verify text-primary me-2 fs-16"></i>
                                                            <p>Adult-Only Retreats</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div>
                                                        <h6 className="mb-2">Family & Kids</h6>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <i className="isax isax-verify text-primary me-2 fs-16"></i>
                                                            <p>Kids' Clubs</p>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <i className="isax isax-verify text-primary me-2 fs-16"></i>
                                                            <p>Arcades</p>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-0">
                                                            <i className="isax isax-verify text-primary me-2 fs-16"></i>
                                                            <p>Water Parks</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div>
                                                        <h6 className="mb-2">Accommodations</h6>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <i className="isax isax-verify text-primary me-2 fs-16"></i>
                                                            <p>Cabins</p>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <i className="isax isax-verify text-primary me-2 fs-16"></i>
                                                            <p>Private Balconies</p>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-0">
                                                            <i className="isax isax-verify text-primary me-2 fs-16"></i>
                                                            <p>Concierge and Butler Service</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4 border-0">
                                    <div className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_six" aria-expanded="true">
                                            Available Cabins
                                        </button>
                                    </div>
                                    <div id="accordion_collapse_six" className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            <div className="hotel-list">
                                                <div className="place-item mb-4">
                                                    <div className="place-img">
                                                        <div className="img-slider owl-carousel nav-center">
                                                            <div className="slide-images">
                                                                <Link href={routes.cruiseDetails}>
                                                                    <ImageWithBasePath src="assets/img/cruise/cruise-04.jpg" className="img-fluid" alt="img" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="fav-item" key={1} onClick={() => handleItemClick(1)}>
                                                            <span className="badge bg-pink">Popular</span>
                                                            <Link href="#" className={`fav-icon ${selectedItems[1] ? 'selected' : ''}`}>
                                                                <i className="isax isax-heart5"></i>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="place-content pb-1">
                                                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                            <div className="overflow-hidden">
                                                                <h5 className="mb-2 d-inline-flex align-items-center text-truncate"><Link href={routes.cruiseDetails}>Balcony</Link></h5>
                                                            </div>
                                                            <div className="d-flex align-items-center text-nowrap mb-2">
                                                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.3</span>
                                                                <p className="fs-14">(380 Reviews)</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center flex-wrap">
                                                            <p className="mb-2 d-inline-flex align-items-center fs-14"><i className="isax isax-tick-circle5 text-success me-2"></i>Butler Service</p>
                                                            <p className="me-2 mb-2 d-inline-flex align-items-center fs-14"><i className="isax isax-tick-circle5 text-success me-2"></i>Laundry Services</p>
                                                        </div>
                                                        <div className="d-flex align-items-center flex-wrap">
                                                            <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2"> LED TV 2</span>
                                                            <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2"> Refrigerator</span>
                                                            <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">Balcony </span>
                                                            <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">15 m²</span>
                                                            <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">Free WiFi</span>
                                                            <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">Private Safe</span>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                                            <h5 className="text-primary me-2 mb-3">$252 <span className="text-default text-decoration-line-through">$252</span> <span className="fs-14 fw-normal text-default">/ Night ( $759 total includes taxes & fees)</span></h5>
                                                            <div className="btn btn-primary btn-md mb-3">
                                                                <div className="form-check d-flex align-items-center ps-0">
                                                                    <input className="form-check-input ms-0 mt-0 border border-white" name="book" type="checkbox" id="book1" defaultChecked />
                                                                    <label className="form-check-label fs-13 text-white ms-2" htmlFor="book1">Select</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="place-item mb-4">
                                                    <div className="place-img">
                                                        <div className="img-slider owl-carousel nav-center">
                                                            <div className="slide-images">
                                                                <Link href={routes.cruiseDetails}>
                                                                    <ImageWithBasePath src="assets/img/cruise/cruise-06.jpg" className="img-fluid" alt="img" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="fav-item justify-content-end" key={2} onClick={() => handleItemClick(2)}>
                                                            <Link href="#" className={`fav-icon ${selectedItems[2] ? 'selected' : ''}`}>
                                                                <i className="isax isax-heart5"></i>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="place-content pb-1">
                                                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                            <div className="overflow-hidden">
                                                                <h5 className="mb-2 d-inline-flex align-items-center text-truncate"><Link href={routes.cruiseDetails}>Ocean View</Link></h5>
                                                            </div>
                                                            <div className="d-flex align-items-center text-nowrap mb-2">
                                                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.3</span>
                                                                <p className="fs-14">(380 Reviews)</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center flex-wrap">
                                                            <p className="me-2 mb-2 d-inline-flex align-items-center fs-14"><i className="isax isax-tick-circle5 text-success me-2"></i>Unlimited Wi-Fi</p>
                                                            <p className="mb-2 d-inline-flex align-items-center fs-14"><i className="isax isax-tick-circle5 text-success me-2"></i>Private Dining</p>
                                                        </div>
                                                        <div className="d-flex align-items-center flex-wrap">
                                                            <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2"> LED TV 2</span>
                                                            <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2"> Refrigerator</span>
                                                            <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">Balcony </span>
                                                            <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">15 m²</span>
                                                            <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">Free WiFi</span>
                                                            <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">Private Safe</span>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                                            <h5 className="text-primary me-2 mb-3">$658 <span className="text-default text-decoration-line-through">$252</span> <span className="fs-14 fw-normal text-default">/ Night ( $759 total includes taxes & fees)</span></h5>
                                                            <div className="btn btn-primary btn-md mb-3">
                                                                <div className="form-check d-flex align-items-center ps-0">
                                                                    <input className="form-check-input ms-0 mt-0 border border-white" name="book" type="checkbox" id="book2" />
                                                                    <label className="form-check-label fs-13 text-white ms-2" htmlFor="book2">Select</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="place-item mb-0">
                                                    <div className="place-img">
                                                        <div className="img-slider owl-carousel nav-center">
                                                            <div className="slide-images">
                                                                <Link href={routes.cruiseDetails}>
                                                                    <ImageWithBasePath src="assets/img/cruise/cruise-14.jpg" className="img-fluid" alt="img" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="fav-item justify-content-end" key={3} onClick={() => handleItemClick(3)}>
                                                            <Link href="#" className={`fav-icon ${selectedItems[3] ? 'selected' : ''}`}>
                                                                <i className="isax isax-heart5"></i>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="place-content pb-1">
                                                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                            <div className="overflow-hidden">
                                                                <h5 className="mb-2 d-inline-flex align-items-center text-truncate"><Link href={routes.cruiseDetails}>Suite</Link></h5>
                                                            </div>
                                                            <div className="d-flex align-items-center text-nowrap mb-2">
                                                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.3</span>
                                                                <p className="fs-14">(380 Reviews)</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center flex-wrap">
                                                            <p className="me-2 mb-2 d-inline-flex align-items-center fs-14"><i className="isax isax-tick-circle5 text-success me-2"></i>Laundry Services</p>
                                                            <p className="mb-2 d-inline-flex align-items-center fs-14"><i className="isax isax-tick-circle5 text-success me-2"></i>Butler Service</p>
                                                        </div>
                                                        <div className="d-flex align-items-center flex-wrap">
                                                            <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2"> LED TV 2</span>
                                                            <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2"> Refrigerator</span>
                                                            <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">Balcony </span>
                                                            <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">15 m²</span>
                                                            <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">Free WiFi</span>
                                                            <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-2">Private Safe</span>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                                            <h5 className="text-primary me-2 mb-3">$658 <span className="text-default text-decoration-line-through">$252</span> <span className="fs-14 fw-normal text-default">/ Night ( $759 total includes taxes & fees)</span></h5>
                                                            <div className="btn btn-primary btn-md mb-3">
                                                                <div className="form-check d-flex align-items-center ps-0">
                                                                    <input className="form-check-input ms-0 mt-0 border border-white" name="book" type="checkbox" id="book3" />
                                                                    <label className="form-check-label fs-13 text-white ms-2" htmlFor="book3">Select</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4 border-0">
                                    <div className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_ten" aria-expanded="true">
                                            Itinerary
                                        </button>
                                    </div>
                                    <div id="accordion_collapse_ten" className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            <div className="stage-flow">
                                                {itineraryDays.map((day) => (
                                                    <div className="d-flex align-items-center flows-step" key={day.step}>
                                                        <span className="flow-step">{day.step}</span>
                                                        <div className="flow-content">
                                                            <div className="d-flex align-items-center justify-content-between flex-wrap mb-1">
                                                                <div className="mb-1">
                                                                    <h6 className="fw-medium mb-1">{day.title}</h6>
                                                                    <p>{day.time}</p>
                                                                </div>
                                                                <span className="avatar avatar-lg avatar-rounded flex-shrink-0 mb-1"><ImageWithBasePath src={day.image} alt={day.title.replace(/^Day \d+, /, '')} /></span >
                                                            </div>
                                                            <p>{day.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4 border-0">
                                    <div className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_four" aria-expanded="true">
                                            Gallery
                                        </button>
                                    </div>
                                    <div id="accordion_collapse_four" className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            <Lightbox
                                                open={open}
                                                close={() => setOpen(false)}
                                                slides={[
                                                    { src: `${img_path}assets/img/cruise/cruise-large-01.jpg` },
                                                    { src: `${img_path}assets/img/cruise/cruise-large-02.jpg` },
                                                    { src: `${img_path}assets/img/cruise/cruise-large-03.jpg` },
                                                    { src: `${img_path}assets/img/cruise/cruise-large-04.jpg` },
                                                    { src: `${img_path}assets/img/cruise/cruise-large-05.jpg` },
                                                ]}
                                            />
                                            <div className="row row-cols-lg-6 row-cols-sm-4 row-cols-2 g-2">
                                                <div className="col">
                                                    <Link className="galley-wrap" href="#" onClick={() => setOpen(true)}>
                                                        <ImageWithBasePath src="assets/img/cruise/cruise-thumb-01.jpg" alt="img" />
                                                    </Link>
                                                </div>
                                                <div className="col">
                                                    <Link className="galley-wrap" href="#" onClick={() => setOpen(true)}>
                                                        <ImageWithBasePath src="assets/img/cruise/cruise-thumb-02.jpg" alt="img" />
                                                    </Link>
                                                </div>
                                                <div className="col">
                                                    <Link className="galley-wrap" href="#" onClick={() => setOpen(true)}>
                                                        <ImageWithBasePath src="assets/img/cruise/cruise-thumb-03.jpg" alt="img" />
                                                    </Link>
                                                </div>
                                                <div className="col">
                                                    <Link className="galley-wrap" href="#" onClick={() => setOpen(true)}>
                                                        <ImageWithBasePath src="assets/img/cruise/cruise-thumb-04.jpg" alt="img" />
                                                    </Link>
                                                </div>
                                                <div className="col">
                                                    <Link className="galley-wrap" href="#" onClick={() => setOpen(true)}>
                                                        <ImageWithBasePath src="assets/img/cruise/cruise-thumb-05.jpg" alt="img" />
                                                    </Link>
                                                </div>
                                                <div className="col">
                                                    <div className="galley-wrap more-gallery d-flex align-items-center justify-content-center">
                                                        <Link href="#" onClick={() => setOpen(true)} className="btn btn-white btn-xs"><i className="isax isax-image5 me-1"></i>See All</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4 border-0">
                                    <div className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_five" aria-expanded="true">
                                            Video
                                        </button>
                                    </div>
                                    <div id="accordion_collapse_five" className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            <div className="position-relative">
                                                <Link href="#">
                                                    <ImageWithBasePath src="assets/img/cruise/cruise-large-03.jpg" className="rounded" alt="Img" />
                                                </Link>
                                                <Link href="# " onClick={handleOpenModal} className="avatar play-video rounded-circle circle-middle">
                                                    <span><i className="isax isax-play5 text-dark fs-16"></i></span>
                                                </Link>
                                                <VideoModal show={showModal} handleClose={handleCloseModal} videoUrl={videoUrl} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4 border-0">
                                    <div className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_seven" aria-expanded="true">
                                            Location
                                        </button>
                                    </div>
                                    <div id="accordion_collapse_seven" className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            {/* Map */}
                                            <div>
                                                <iframe src="https://www.google.com/maps?q=Port%20of%20Barcelona%20Cruise%20Terminal%2C%20Spain&output=embed"
                                                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="tour-detail-map w-100"></iframe>
                                            </div>
                                            {/* /Map */}
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4 border-0" id="location">
                                    <div className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_eight" aria-expanded="true">
                                            Frequently Asked Questions
                                        </button>
                                    </div>
                                    <div id="accordion_collapse_eight" className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            <div className="accordion faq-accordion" id="accordionFaq">
                                                <div className="accordion-item show mb-2">
                                                    <div className="accordion-header">
                                                        <button className="accordion-button fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapseOne" aria-controls="faq-collapseOne">
                                                            What is the minimum age to sail?
                                                        </button>
                                                    </div>
                                                    <div id="faq-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFaq">
                                                        <div className="accordion-body">
                                                            <p className="mb-0">
                                                                Guests must be 21 or over to book a cabin unless travelling with a parent or guardian. Infants must be at least six months old on the sailing date.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item mb-2">
                                                    <div className="accordion-header">
                                                        <button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-two" aria-controls="faq-two">
                                                            What documents do I need at embarkation?
                                                        </button>
                                                    </div>
                                                    <div id="faq-two" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                                        <div className="accordion-body">
                                                            <p className="mb-0">
                                                                A passport valid for at least six months beyond the disembarkation date, your boarding pass, and any visa required by the ports on your itinerary.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item mb-2">
                                                    <div className="accordion-header">
                                                        <button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-three" aria-controls="faq-three">
                                                            What cabin categories are available?
                                                        </button>
                                                    </div>
                                                    <div id="faq-three" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                                        <div className="accordion-body">
                                                            <p className="mb-0">
                                                                Interior, Ocean View, Balcony and Suite categories are available on this sailing, spread across decks 5 to 11. Cabin size and included services vary by category.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <div className="accordion-header">
                                                        <button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-four" aria-controls="faq-four">
                                                            Can I pay for my booking with a debit card?
                                                        </button>
                                                    </div>
                                                    <div id="faq-four" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                                        <div className="accordion-body">
                                                            <p className="mb-0">
                                                                Yes. We accept Visa, Mastercard and Amex debit and credit cards, along with PayPal and Stripe. A refundable onboard deposit is taken at embarkation.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4 mb-xl-0 border-0" id="reviews">
                                    <div className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_nine" aria-expanded="true">
                                            Reviews
                                        </button>
                                    </div>
                                    <div id="accordion_collapse_nine" className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            <Reviews />
                                            <Lightbox
                                                open={open2}
                                                close={() => setOpen2(false)}
                                                slides={[
                                                    { src: `${img_path}assets/img/cruise/cruise-large-01.jpg` },
                                                    { src: `${img_path}assets/img/cruise/cruise-large-02.jpg` },
                                                    { src: `${img_path}assets/img/cruise/cruise-large-03.jpg` },
                                                    { src: `${img_path}assets/img/cruise/cruise-large-04.jpg` },
                                                    { src: `${img_path}assets/img/cruise/cruise-large-05.jpg` },
                                                    { src: `${img_path}assets/img/cruise/cruise-large-06.jpg` },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Details */}
                        <div className="col-xl-4">

                            <CruiseInfo />

                        </div>
                        {/* /Sidebar Details */}

                    </div>
                </div>
            </div>
        </>
    )
}

export default CruiseDetails