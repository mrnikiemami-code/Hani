"use client";
import React, { useState } from 'react'
import Link from "next/link";
import { BedType, Category, CountryOption, HotelName, MaximumOccupancy, RoomType, Sleep, StarRating, View } from '../../../../core/data/mock/selectOption';
import { DatePicker } from '../../../../components/common-date-picker/appDatePicker'
import DefaultEditor from "react-simple-wysiwyg";
import StickyBox from 'react-sticky-box';

import Scrollspy from 'react-scrollspy';
import { all_routes } from '../../../../routes/all_routes';
import Breadcrumb from '../../../../components/breadcrumb/breadcrumb';
import CustomSelect from '../../../../components/common-select/commonSelect';
import ImageWithBasePath from '../../../../components/image-with-base-path';
import AddFaq from '../../../../components/modals/addFaq';
import EditFaq from '../../../../components/modals/editFaq';
import DeleteModal from '../../../../components/modals/deleteModal';


const EditHotel = () => {

    const routes = all_routes
    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Edit Hotel',
            active: false,
            link: routes.home1
        },
        {
            label: 'Edit Hotel',
            active: true,
        },
    ];

    const [defaultDate] = useState(new Date());

    const [values, setValue] = React.useState();

    function onChange(e: any) {
        setValue(e.target.value);
    }

    const [highlights, setHighlights] = useState<string[]>([]);

    const addHighlight = () => {
        setHighlights([...highlights, ""]); // Add an empty highlight
    };

    const removeHighlight = (index: number) => {
        setHighlights(highlights.filter((_, i) => i !== index)); // Remove the highlight by index
    };

    const updateHighlight = (index: number, value: string) => {
        const updatedHighlights = [...highlights];
        updatedHighlights[index] = value; // Update the value of a highlight
        setHighlights(updatedHighlights);
    };

    const [galleryItems, setGalleryItems] = useState<string[]>([
        "assets/img/uploads/upload-01.jpg",
        "assets/img/uploads/upload-02.jpg",
        "assets/img/uploads/upload-03.jpg",
        "assets/img/uploads/upload-04.jpg",
        "assets/img/uploads/upload-05.jpg",
    ]);
    const removeGalleryItem = (index: number) => {
        setGalleryItems(galleryItems.filter((_, i) => i !== index)); // Remove item by index
    };


    return (
        <div>
            <Breadcrumb title="Edit Hotel" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-01" />


            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    <div className="place-nav">
                        <ul className="nav" role="tablist">
                            <li>
                                <Link
                                    href="#"
                                    className="nav-link active"
                                    data-bs-toggle="tab"
                                    data-bs-target="#add_hotel"
                                    aria-selected="true"
                                    role="tab"
                                >
                                    Edit Hotel
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="nav-link"
                                    data-bs-toggle="tab"
                                    data-bs-target="#add_room"
                                    aria-selected="false"
                                    role="tab"
                                    tabIndex={-1}
                                >
                                    Edit Room
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content">
                        {/* Edit Hotel */}
                        <div
                            className="tab-pane fade active show"
                            id="add_hotel"
                            role="tabpanel"
                        >
                            <div className="row">
                                <div className="col-lg-3 theiaStickySidebar">
                                    <StickyBox>
                                        <div className="card border-0 mb-4 mb-lg-0">
                                            <div className="card-body">
                                                <div>
                                                    <h5 className="mb-3">Edit Hotel</h5>
                                                    <ul className="add-tab-list">
                                                        <Scrollspy items={['basic_info', 'location', 'highlights', 'room_types', 'popular_amenities', 'faq', 'gallery', 'description']}
                                                            currentClassName="active">
                                                            <li className='active'>
                                                                <Link href="#basic_info">
                                                                    Basic Info
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#location">Locations</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#highlights">Highlights</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#room_types">Room Types</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#popular_amenities">Popular Amenities</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#faq">FAQ</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#gallery">Gallery</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#description">Description</Link>
                                                            </li>
                                                        </Scrollspy>

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </StickyBox>
                                </div>
                                <div className="col-lg-9">
                                    <form action={routes.hotelGrid}>
                                        <div className="card shadow-none" id="basic_info">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h5 className="fs-18">Hotel Details</h5>
                                                </div>
                                            </div>
                                            <div className="card-body pb-1">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">Hotel Name</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Category</label>
                                                            <CustomSelect
                                                                options={Category}
                                                                className="select d-flex"
                                                                placeholder="Select"
                                                                defaultValue={Category[0]}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Established</label>
                                                            <div className="input-icon-end position-relative">
                                                                <DatePicker
                                                                    className="form-control datetimepicker"
                                                                    placeholder="dd/mm/yyyy"
                                                                    defaultValue={defaultDate}
                                                                    format="DD-MM-YYYY"
                                                                />
                                                                <span className="input-icon-addon">
                                                                    <i className="isax isax-calendar" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Renovation</label>
                                                            <div className="input-icon-end position-relative">
                                                                <DatePicker
                                                                    className="form-control datetimepicker"
                                                                    placeholder="dd/mm/yyyy"
                                                                    defaultValue={defaultDate}
                                                                    format="DD-MM-YYYY"
                                                                />
                                                                <span className="input-icon-addon">
                                                                    <i className="isax isax-calendar" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Star Ratings</label>
                                                            <CustomSelect
                                                                options={StarRating}
                                                                className="select d-flex"
                                                                placeholder="Select"
                                                                defaultValue={StarRating[0]}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">
                                                                Total Number Of Rooms
                                                            </label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Maximum Capacity</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card shadow-none" id="location">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h5 className="fs-18">Location</h5>
                                                </div>
                                            </div>
                                            <div className="card-body pb-1">
                                                <div className="row">
                                                    <div className="col-xl-3 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Country</label>
                                                            <CustomSelect
                                                                options={CountryOption}
                                                                className="select d-flex"
                                                                placeholder="Select"
                                                                defaultValue={CountryOption[1]}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-3 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">City</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-3 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">State</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-3 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Zip Code</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">Address</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">Address 1</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card shadow-none" id="highlights">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h5 className="fs-18">Highlights</h5>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="row add-highlight-info">
                                                    <div className="col-md-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">Highlights</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    {highlights.map((highlight, index) => (
                                                        <div key={index} className="mb-3">
                                                            <label>Highlight</label>
                                                            <div className="d-flex">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={highlight}
                                                                    onChange={(e) => updateHighlight(index, e.target.value)}
                                                                />
                                                                <Link href="#"
                                                                    onClick={() => removeHighlight(index)}
                                                                    className="text-danger trash-icon d-flex align-items-center justify-content-center ms-3"
                                                                ><i className="isax isax-trash"></i>

                                                                </Link>
                                                            </div>
                                                        </div>
                                                    )
                                                    )}

                                                </div>
                                                <div>
                                                    <Link
                                                        href="#"
                                                        onClick={addHighlight}
                                                        className="btn btn-primary btn-sm add-highlight"

                                                    >
                                                        <i className="isax isax-add-circle me-1" />
                                                        Add New
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card shadow-none">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h5 className="fs-18">Services</h5>
                                                </div>
                                            </div>
                                            <div className="card-body pb-1">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-1"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-1"
                                                                >
                                                                    24-Hour Room Service
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-2"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-2"
                                                                >
                                                                    In-Room Dining
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-3"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-3"
                                                                >
                                                                    Concierge Services
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-4"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-4"
                                                                >
                                                                    Daily Housekeeping
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-5"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-5"
                                                                >
                                                                    Front Desk Services
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-6"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-6"
                                                                >
                                                                    On-Site Restaurants
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-7"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-7"
                                                                >
                                                                    Check-In/Check-Out Assistance
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-8"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-8"
                                                                >
                                                                    Free luggage deposit
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-9"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-9"
                                                                >
                                                                    Laundry and Ironing Service
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-10"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-10"
                                                                >
                                                                    Dry Cleaning Service
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-11"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-11"
                                                                >
                                                                    Hair and Beauty Service
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-12"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-12"
                                                                >
                                                                    In-Room Spa Treatments
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-13"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-13"
                                                                >
                                                                    Valet Parking
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-14"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-14"
                                                                >
                                                                    Babysitting
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-15"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-15"
                                                                >
                                                                    Dry Cleaning Service
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-16"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-16"
                                                                >
                                                                    Wake-Up Call Service
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-17"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-17"
                                                                >
                                                                    Translator Service
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-18"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-18"
                                                                >
                                                                    Currency Exchange Service
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card shadow-none">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h5 className="fs-18">Accessibility</h5>
                                                </div>
                                            </div>
                                            <div className="card-body pb-1">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-1"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-1"
                                                                >
                                                                    Wheelchair accessible
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-2"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-2"
                                                                >
                                                                    Visual alarms in hallways
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-3"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-3"
                                                                >
                                                                    Elevator
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-4"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-4"
                                                                >
                                                                    Braille/raised signage
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-5"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-5"
                                                                >
                                                                    Roll-in shower with a bench or seat
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-6"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-6"
                                                                >
                                                                    Grab bars near the toilet and shower
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-7"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-7"
                                                                >
                                                                    Wheelchair-accessible gym
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-8"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-8"
                                                                >
                                                                    Wheelchair-accessible business center
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-9"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-9"
                                                                >
                                                                    Wheelchair-accessible lounge
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-10"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-10"
                                                                >
                                                                    Wheelchair-accessible concierge desk
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-11"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-11"
                                                                >
                                                                    Lowered towel racks
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-12"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-12"
                                                                >
                                                                    Braille on room numbers, elevator buttons
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-13"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-13"
                                                                >
                                                                    Step-free or ramped access
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-14"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-14"
                                                                >
                                                                    Automatic doors
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-15"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-15"
                                                                >
                                                                    Grab bars in the bathroom
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-16"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-16"
                                                                >
                                                                    Wide doorways
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-17"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-17"
                                                                >
                                                                    Lowered switches
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-18"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-18"
                                                                >
                                                                    Accessible curtains
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card shadow-none" id="room_types">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h5 className="fs-18">Room Types</h5>
                                                </div>
                                            </div>
                                            <div className="card-body pb-1">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="room-1"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="room-1"
                                                                >
                                                                    Single Room
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="room-2"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="room-2"
                                                                >
                                                                    Double Room
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="room-3"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="room-3"
                                                                >
                                                                    Twin Room
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="room-4"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="room-4"
                                                                >
                                                                    Deluxe Room
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="room-5"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="room-5"
                                                                >
                                                                    Suite
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="room-6"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="room-6"
                                                                >
                                                                    Junior Suite
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="room-7"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="room-7"
                                                                >
                                                                    Family Room
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="room-8"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="room-8"
                                                                >
                                                                    Connecting Rooms
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="room-9"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="room-9"
                                                                >
                                                                    Accessible Room
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="room-10"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="room-10"
                                                                >
                                                                    Studio Room
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="room-11"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="room-11"
                                                                >
                                                                    Penthouse
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="room-12"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="room-12"
                                                                >
                                                                    Villa
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="room-13"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="room-13"
                                                                >
                                                                    Economy Room
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="room-14"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="room-14"
                                                                >
                                                                    City View
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="room-15"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="room-15"
                                                                >
                                                                    Ocean View
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card shadow-none" id="popular_amenities">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h5 className="fs-18">Amenities</h5>
                                                </div>
                                            </div>
                                            <div className="card-body pb-1">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-1"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-1"
                                                                >
                                                                    Free Wi-Fi
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-2"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-2"
                                                                >
                                                                    Air Conditioning
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-3"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-3"
                                                                >
                                                                    Heater
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-4"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-4"
                                                                >
                                                                    TV (Cable/Satellite)
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-5"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-5"
                                                                >
                                                                    Coffee Maker
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-6"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-6"
                                                                >
                                                                    Mini Fridge
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-7"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-7"
                                                                >
                                                                    Safe Deposit Box
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-8"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-8"
                                                                >
                                                                    Iron/Ironing Board
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-9"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-9"
                                                                >
                                                                    Hair Dryer
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-10"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-10"
                                                                >
                                                                    Shower
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-11"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-11"
                                                                >
                                                                    Jacuzzi/Hot Tub
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-12"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-12"
                                                                >
                                                                    Microwave
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-13"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-13"
                                                                >
                                                                    Bluetooth Speaker
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-14"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-14"
                                                                >
                                                                    Sofa/Seating Area
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-15"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-15"
                                                                >
                                                                    Extra Pillows and Blankets
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card shadow-none" id="faq">
                                            <div className="card-header">
                                                <h5 className="fs-18">FAQ</h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="card shadow-none mb-3">
                                                    <div className="card-body px-3 py-2">
                                                        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                                                            <h6>
                                                                <Link href="#">
                                                                    Does offer free cancellation for a full refund?
                                                                </Link>
                                                            </h6>
                                                            <div className="d-flex align-items-center">
                                                                <Link
                                                                    href="#"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#edit_faq"
                                                                    className="rounded-edit d-flex align-items-center justify-content-center me-2"
                                                                >
                                                                    <i className="isax isax-edit-2" />
                                                                </Link>
                                                                <Link
                                                                    href="#"
                                                                    className="trash-icon d-flex align-items-center justify-content-center"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#delete_modal"
                                                                >
                                                                    <i className="isax isax-trash text-danger" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card shadow-none mb-3">
                                                    <div className="card-body px-3 py-2">
                                                        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                                                            <h6>
                                                                <Link href="#">Is there a pool?</Link>
                                                            </h6>
                                                            <div className="d-flex align-items-center">
                                                                <Link
                                                                    href="#"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#edit_faq"
                                                                    className="rounded-edit d-flex align-items-center justify-content-center me-2"
                                                                >
                                                                    <i className="isax isax-edit-2" />
                                                                </Link>
                                                                <Link
                                                                    href="#"
                                                                    className="trash-icon d-flex align-items-center justify-content-center"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#delete_modal"
                                                                >
                                                                    <i className="isax isax-trash text-danger" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Link
                                                        href="#"
                                                        className="btn btn-primary btn-sm add-highlight"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#add_faq"
                                                    >
                                                        <i className="isax isax-add-circle me-1" />
                                                        Add New
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card shadow-none" id="gallery">
                                            <div className="card-header">
                                                <h5 className="fs-18">Gallery</h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="file-upload drag-file w-100 d-flex align-items-center justify-content-center flex-column mb-2">
                                                    <span className="upload-img d-block mb-2">
                                                        <i className="isax isax-document-upload fs-24" />
                                                    </span>
                                                    <h6 className="mb-1">Upload Gallery Images</h6>
                                                    <p className="mb-0">
                                                        Upload Feature Image First, Image size should below 5MB
                                                    </p>
                                                    <input type="file" accept="video/image" />
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    {galleryItems.map((src, index) => (
                                                        <Link href="#" key={index} className="gallery-upload-img me-2">
                                                            <ImageWithBasePath src={src} alt={`Gallery Item ${index + 1}`} />
                                                            <span
                                                                className="trash-icon d-flex align-items-center justify-content-center text-danger gallery-trash"
                                                                onClick={() => removeGalleryItem(index)}
                                                            >
                                                                <i className="isax isax-trash" />
                                                            </span>
                                                        </Link>
                                                    ))}

                                                </div>
                                            </div>
                                        </div>
                                        <div className="card shadow-none" id="description">
                                            <div className="card-header">
                                                <h5 className="fs-18">Description</h5>
                                            </div>
                                            <div className="card-body text-editor">
                                                <DefaultEditor value={values} onChange={onChange} />
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <button type="button" className="btn btn-light me-2">
                                                Reset
                                            </button>
                                            <button type="submit" className="btn btn-primary">
                                                Add New Hotel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* /Edit Hotel */}
                        {/* Add Room */}
                        <div className="tab-pane fade" id="add_room" role="tabpanel">
                            <div className="row">
                                <div className="col-lg-3 theiaStickySidebar">
                                    <StickyBox>
                                        <div className="card border-0">
                                            <div className="card-body">
                                                <div>
                                                    <h5 className="mb-3">Add Room</h5>
                                                    <ul className="add-tab-list">
                                                        <Scrollspy items={['basic_info_2', 'description_2', 'specification', 'services', 'accssibilty', 'popular_amenities_2', 'gallery_2']}
                                                            currentClassName="active">
                                                            <li>
                                                                <Link href="#basic_info_2" className="active">
                                                                    Basic Info
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#description_2">Description</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#specification">Specifications</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#services">Services</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#accssibilty">Accessibility</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#popular_amenities_2">Amenities</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#gallery_2">Gallery</Link>
                                                            </li>
                                                        </Scrollspy>

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </StickyBox>


                                </div>
                                <div className="col-lg-9">
                                    <form action={routes.hotelGrid}>
                                        <div className="card shadow-none" id="basic_info_2">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h5 className="fs-18">Basic Info</h5>
                                                </div>
                                            </div>
                                            <div className="card-body pb-1">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">Room Name</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Room Type</label>
                                                            <CustomSelect
                                                                options={RoomType}
                                                                className="select d-flex"
                                                                placeholder="Select"
                                                                defaultValue={RoomType[2]}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Hotel Name</label>
                                                            <CustomSelect
                                                                options={HotelName}
                                                                className="select d-flex"
                                                                placeholder="Select"
                                                                defaultValue={HotelName[1]}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card shadow-none" id="description_2">
                                            <div className="card-header">
                                                <h5 className="fs-18">Description</h5>
                                            </div>
                                            <div className="card-body text-editor">
                                                <div className="summernote" />
                                            </div>
                                        </div>
                                        <div className="card shadow-none" id="specification">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h5 className="fs-18">Specifications</h5>
                                                </div>
                                            </div>
                                            <div className="card-body pb-1">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">
                                                                Maximum Occupancy
                                                            </label>
                                                            <CustomSelect
                                                                options={MaximumOccupancy}
                                                                className="select d-flex"
                                                                placeholder="Select"
                                                                defaultValue={MaximumOccupancy[1]}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Room Size</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Sleeps</label>
                                                            <CustomSelect
                                                                options={Sleep}
                                                                className="select d-flex"
                                                                placeholder="Select"
                                                                defaultValue={Sleep[1]}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Bed Type</label>
                                                            <CustomSelect
                                                                options={BedType}
                                                                className="select d-flex"
                                                                placeholder="Select"
                                                                defaultValue={BedType[1]}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">View</label>
                                                            <CustomSelect
                                                                options={View}
                                                                className="select d-flex"
                                                                placeholder="Select"
                                                                defaultValue={View[1]}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Price Per Night</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card shadow-none" id="services">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h5 className="fs-18">Services</h5>
                                                </div>
                                            </div>
                                            <div className="card-body pb-1">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-19"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-19"
                                                                >
                                                                    24-Hour Room Service
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-20"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-20"
                                                                >
                                                                    In-Room Dining
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-21"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-21"
                                                                >
                                                                    Concierge Services
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-22"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-22"
                                                                >
                                                                    Daily Housekeeping
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-23"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-23"
                                                                >
                                                                    Check-In/Check-Out Assistance
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-24"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-24"
                                                                >
                                                                    Free luggage deposit
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-25"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-25"
                                                                >
                                                                    Laundry and Ironing Service
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-26"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-26"
                                                                >
                                                                    Dry Cleaning Service
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-27"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-27"
                                                                >
                                                                    Valet Parking
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-28"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-28"
                                                                >
                                                                    Babysitting
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-29"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-29"
                                                                >
                                                                    Dry Cleaning Service
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-30"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-30"
                                                                >
                                                                    Wake-Up Call Service
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card shadow-none" id="accssibilty">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h5 className="fs-18">Accessibility</h5>
                                                </div>
                                            </div>
                                            <div className="card-body pb-1">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-19"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-19"
                                                                >
                                                                    Wheelchair accessible
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-20"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-20"
                                                                >
                                                                    Visual alarms in hallways
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-21"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-21"
                                                                >
                                                                    Elevator
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-22"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-22"
                                                                >
                                                                    Braille/raised signage
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-23"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-23"
                                                                >
                                                                    Wheelchair-accessible gym
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-24"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-24"
                                                                >
                                                                    Wheelchair-accessible business center
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-25"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-25"
                                                                >
                                                                    Wheelchair-accessible lounge
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-26"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-26"
                                                                >
                                                                    Wheelchair-accessible concierge desk
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-27"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-27"
                                                                >
                                                                    Step-free or ramped access
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-28"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-28"
                                                                >
                                                                    Automatic doors
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="accessibility-29"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="accessibility-29"
                                                                >
                                                                    Grab bars in the bathroom
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card shadow-none" id="popular_amenities_2">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h5 className="fs-18">Amenities</h5>
                                                </div>
                                            </div>
                                            <div className="card-body pb-1">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-16"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-16"
                                                                >
                                                                    Free Wi-Fi
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-17"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-17"
                                                                >
                                                                    Air Conditioning
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-18"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-18"
                                                                >
                                                                    Heater
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-19"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-19"
                                                                >
                                                                    Safe Deposit Box
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-20"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-20"
                                                                >
                                                                    Iron/Ironing Board
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-21"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-21"
                                                                >
                                                                    Hair Dryer
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-22"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-22"
                                                                >
                                                                    Bluetooth Speaker
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-23"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-23"
                                                                >
                                                                    Sofa/Seating Area
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="amenities-24"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="amenities-24"
                                                                >
                                                                    Extra Pillows and Blankets
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card shadow-none" id="gallery_2">
                                            <div className="card-header">
                                                <h5 className="fs-18">Gallery</h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="file-upload drag-file w-100 d-flex align-items-center justify-content-center flex-column mb-2">
                                                    <span className="upload-img d-block mb-2">
                                                        <i className="isax isax-document-upload fs-24" />
                                                    </span>
                                                    <h6 className="mb-1">Upload Gallery Images</h6>
                                                    <p className="mb-0">
                                                        Upload Feature Image First, Image size should below 5MB
                                                    </p>
                                                    <input type="file" accept="video/image" />
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    {galleryItems.map((src, index) => (
                                                        <Link href="#" key={index} className="gallery-upload-img me-2">
                                                            <ImageWithBasePath src={src} alt={`Gallery Item ${index + 1}`} />
                                                            <span
                                                                className="trash-icon d-flex align-items-center justify-content-center text-danger gallery-trash"
                                                                onClick={() => removeGalleryItem(index)}
                                                            >
                                                                <i className="isax isax-trash" />
                                                            </span>
                                                        </Link>
                                                    ))}

                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <button type="button" className="btn btn-light me-2">
                                                Reset
                                            </button>
                                            <button type="submit" className="btn btn-primary">
                                                Add New Room
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* /Add Room */}
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}
            <AddFaq />
            <EditFaq />
            <DeleteModal />
        </div>
    )
}

export default EditHotel
