"use client";
import React, { useState } from 'react'
import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import ImageWithBasePath from '../../../components/image-with-base-path';
import Link from "next/link";
import AddFaq from '../../../components/modals/addFaq';
import DeleteModal from '../../../components/modals/deleteModal';
import EditFaq from '../../../components/modals/editFaq';
import DefaultEditor from "react-simple-wysiwyg";
import CustomSelect from '../../../components/common-select/commonSelect';
import { CountryOption, Days, Nights, tourCategory } from '../../../core/data/mock/selectOption';
import { DatePicker } from '../../../components/common-date-picker/appDatePicker'

const AddTour = () => {
    const routes = all_routes
    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Tour Details',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Add Tours',
            active: true,
        },

    ];
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
        <>
            <Breadcrumb
                title="Add Tour"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-02"
            />

            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    <div className="row">

                        {/* Sidebar */}
                        <div className="col-lg-3 ">
                            <div className="card border-0 mb-4 mb-lg-0 theiaStickySidebar">
                                <div className="card-body">
                                    <div>
                                        <h5 className="mb-3">Add Tour</h5>
                                        <ul id="list-example" className="add-tab-list">
                                            <li><a href="#basic_info" >Tour Details</a></li>
                                            <li><a href="#location">Locations</a></li>
                                            <li><a href="#highlights">Highlights</a></li>
                                            <li><a href="#room_types">Activities</a></li>
                                            <li><a href="#popular_amenities">Includes</a></li>
                                            <li><a href="#excludes">Excludes</a></li>
                                            <li><a href="#itenary">Itinerary</a></li>
                                            <li><a href="#faq">FAQ</a></li>
                                            <li><a href="#gallery">Gallery</a></li>
                                            <li><a href="#description">Description</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /Sidebar */}

                        {/* Add Tour */}
                        <div className="col-lg-9">
                            <form action={routes.tourGrid} data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true"  >
                                <div className="card shadow-none" id="basic_info">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h5 className="fs-18">Tour Details</h5>
                                        </div>
                                    </div>
                                    <div className="card-body pb-1">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Tour Name</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Category</label>
                                                    <CustomSelect
                                                        options={tourCategory}
                                                        className="select d-flex"
                                                        placeholder="Select"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Start Date</label>
                                                    <div className="input-icon-end position-relative">
                                                        <DatePicker
                                                            className="form-control datetimepicker"
                                                            placeholder="dd/mm/yyyy"
                                                            format="DD-MM-YYYY"
                                                        />
                                                        <span className="input-icon-addon">
                                                            <i className="isax isax-calendar"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">End Date</label>
                                                    <div className="input-icon-end position-relative">
                                                        <DatePicker
                                                            className="form-control datetimepicker"
                                                            placeholder="dd/mm/yyyy"
                                                            format="DD-MM-YYYY"
                                                        />
                                                        <span className="input-icon-addon">
                                                            <i className="isax isax-calendar"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Destination</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Duration (Days)</label>
                                                    <CustomSelect
                                                        options={Days}
                                                        className="select d-flex"
                                                        placeholder="Select"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Duration (Nights)</label>
                                                    <CustomSelect
                                                        options={Nights}
                                                        className="select d-flex"
                                                        placeholder="Select"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Total Number Of Peoples Alloted</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Pricing (USD)</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Offer Price (USD)</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Min Age </label>
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
                                <div className="card shadow-none" id="room_types">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h5 className="fs-18">Activities</h5>
                                        </div>
                                    </div>
                                    <div className="card-body pb-1">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6">
                                                <div className="mb-3">
                                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                        <input className="form-check-input ms-0 mt-0" type="checkbox" id="service-1" />
                                                        <label className="form-check-label ms-2" htmlFor="service-1">
                                                            Cultural Experiences
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                        <input className="form-check-input ms-0 mt-0" type="checkbox" id="service-2" />
                                                        <label className="form-check-label ms-2" htmlFor="service-2">
                                                            Culinary Tours
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                        <input className="form-check-input ms-0 mt-0" type="checkbox" id="service-3" />
                                                        <label className="form-check-label ms-2" htmlFor="service-3">
                                                            Sightseeing
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                        <input className="form-check-input ms-0 mt-0" type="checkbox" id="service-4" />
                                                        <label className="form-check-label ms-2" htmlFor="service-4">
                                                            Hiking & Nature Walks
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                        <input className="form-check-input ms-0 mt-0" type="checkbox" id="service-5" />
                                                        <label className="form-check-label ms-2" htmlFor="service-5">
                                                            Water Sports
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                        <input className="form-check-input ms-0 mt-0" type="checkbox" id="service-6" />
                                                        <label className="form-check-label ms-2" htmlFor="service-6">
                                                            Wildlife Safaris
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="mb-3">
                                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                        <input className="form-check-input ms-0 mt-0" type="checkbox" id="service-7" />
                                                        <label className="form-check-label ms-2" htmlFor="service-7">
                                                            Adventure Sports
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                        <input className="form-check-input ms-0 mt-0" type="checkbox" id="service-8" />
                                                        <label className="form-check-label ms-2" htmlFor="service-8">
                                                            Wine & Brewery Tours
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                        <input className="form-check-input ms-0 mt-0" type="checkbox" id="service-9" />
                                                        <label className="form-check-label ms-2" htmlFor="service-9">
                                                            Historical Site Visits
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                        <input className="form-check-input ms-0 mt-0" type="checkbox" id="service-10" />
                                                        <label className="form-check-label ms-2" htmlFor="service-10">
                                                            Boat Tours
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                        <input className="form-check-input ms-0 mt-0" type="checkbox" id="service-11" />
                                                        <label className="form-check-label ms-2" htmlFor="service-11">
                                                            Photography
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                        <input className="form-check-input ms-0 mt-0" type="checkbox" id="service-12" />
                                                        <label className="form-check-label ms-2" htmlFor="service-12">
                                                            Spa & Wellness
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="mb-3">
                                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                        <input className="form-check-input ms-0 mt-0" type="checkbox" id="service-13" />
                                                        <label className="form-check-label ms-2" htmlFor="service-13">
                                                            Cycling
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                        <input className="form-check-input ms-0 mt-0" type="checkbox" id="service-14" />
                                                        <label className="form-check-label ms-2" htmlFor="service-14">
                                                            Volunteering
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                        <input className="form-check-input ms-0 mt-0" type="checkbox" id="service-15" />
                                                        <label className="form-check-label ms-2" htmlFor="service-15">
                                                            Historical Site Visits
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                        <input className="form-check-input ms-0 mt-0" type="checkbox" id="service-16" />
                                                        <label className="form-check-label ms-2" htmlFor="service-16">
                                                            Museum & Art Gallery
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="card shadow-none" id="popular_amenities">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h5 className="fs-18">Includes</h5>
                                                </div>
                                            </div>
                                            <div className="card-body pb-1">
                                                <div>
                                                    <div className="mb-3">
                                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                            <input className="form-check-input ms-0 mt-0" type="checkbox" id="amenities-7" />
                                                            <label className="form-check-label ms-2" htmlFor="amenities-7">
                                                                Exclusive Merchandise
                                                            </label>
                                                        </div>
                                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                            <input className="form-check-input ms-0 mt-0" type="checkbox" id="amenities-8" />
                                                            <label className="form-check-label ms-2" htmlFor="amenities-8">
                                                                Early Venue Access
                                                            </label>
                                                        </div>
                                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                            <input className="form-check-input ms-0 mt-0" type="checkbox" id="amenities-9" />
                                                            <label className="form-check-label ms-2" htmlFor="amenities-9">
                                                                Acoustic Performance
                                                            </label>
                                                        </div>
                                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                            <input className="form-check-input ms-0 mt-0" type="checkbox" id="amenities-10" />
                                                            <label className="form-check-label ms-2" htmlFor="amenities-10">
                                                                Transportation (if applicable)
                                                            </label>
                                                        </div>
                                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                            <input className="form-check-input ms-0 mt-0" type="checkbox" id="amenities-11" />
                                                            <label className="form-check-label ms-2" htmlFor="amenities-11">
                                                                Wildlife Safaris
                                                            </label>
                                                        </div>
                                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                            <input className="form-check-input ms-0 mt-0" type="checkbox" id="amenities-12" />
                                                            <label className="form-check-label ms-2" htmlFor="amenities-12">
                                                                Culinary Tours
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="card shadow-none" id="excludes">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h5 className="fs-18">Excludes</h5>
                                                </div>
                                            </div>
                                            <div className="card-body pb-1">
                                                <div>
                                                    <div className="mb-3">
                                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                            <input className="form-check-input ms-0 mt-0" type="checkbox" id="amenities-1" />
                                                            <label className="form-check-label ms-2" htmlFor="amenities-1">
                                                                Travel Expenses
                                                            </label>
                                                        </div>
                                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                            <input className="form-check-input ms-0 mt-0" type="checkbox" id="amenities-2" />
                                                            <label className="form-check-label ms-2" htmlFor="amenities-2">
                                                                Travel Expenses
                                                            </label>
                                                        </div>
                                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                            <input className="form-check-input ms-0 mt-0" type="checkbox" id="amenities-3" />
                                                            <label className="form-check-label ms-2" htmlFor="amenities-3">
                                                                Accommodation
                                                            </label>
                                                        </div>
                                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                            <input className="form-check-input ms-0 mt-0" type="checkbox" id="amenities-4" />
                                                            <label className="form-check-label ms-2" htmlFor="amenities-4">
                                                                Food and Beverage
                                                            </label>
                                                        </div>
                                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                            <input className="form-check-input ms-0 mt-0" type="checkbox" id="amenities-5" />
                                                            <label className="form-check-label ms-2" htmlFor="amenities-5">
                                                                Parking Fees
                                                            </label>
                                                        </div>
                                                        <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                            <input className="form-check-input ms-0 mt-0" type="checkbox" id="amenities-6" />
                                                            <label className="form-check-label ms-2" htmlFor="amenities-6">
                                                                Personal Expenses
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card shadow-none" id="itenary">
                                    <div className="card-header">
                                        <h5 className="fs-18">Itinerary</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="card shadow-none mb-3">
                                            <div className="card-body px-3 py-2">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                                                    <h6><Link href="#">Day 1, Arrival in Cusco</Link></h6>
                                                    <div className="d-flex align-items-center">
                                                        <Link href="#" data-bs-toggle="modal" data-bs-target="#edit_itenary" className="rounded-edit d-flex align-items-center justify-content-center me-2">
                                                            <i className="isax isax-edit-2"></i>
                                                        </Link>
                                                        <Link href="#" className="trash-icon d-flex align-items-center justify-content-center" data-bs-toggle="modal" data-bs-target="#delete_modal">
                                                            <i className="isax isax-trash text-danger"></i>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Link href="#" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#add_itenary">
                                                <i className="isax isax-add-circle me-1"></i>Add New
                                            </Link>
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
                                                    <h6><Link href="#">Does offer free cancellation for a full refund?</Link></h6>
                                                    <div className="d-flex align-items-center">
                                                        <Link href="#" data-bs-toggle="modal" data-bs-target="#edit_faq" className="rounded-edit d-flex align-items-center justify-content-center me-2">
                                                            <i className="isax isax-edit-2"></i>
                                                        </Link>
                                                        <Link href="#" className="trash-icon d-flex align-items-center justify-content-center" data-bs-toggle="modal" data-bs-target="#delete_modal">
                                                            <i className="isax isax-trash text-danger"></i>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card shadow-none mb-3">
                                            <div className="card-body px-3 py-2">
                                                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                                                    <h6><Link href="#">Is there a pool?</Link></h6>
                                                    <div className="d-flex align-items-center">
                                                        <Link href="#" data-bs-toggle="modal" data-bs-target="#edit_faq" className="rounded-edit d-flex align-items-center justify-content-center me-2">
                                                            <i className="isax isax-edit-2"></i>
                                                        </Link>
                                                        <Link href="#" className="trash-icon d-flex align-items-center justify-content-center" data-bs-toggle="modal" data-bs-target="#delete_modal">
                                                            <i className="isax isax-trash text-danger"></i>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Link href="#" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#add_faq">
                                                <i className="isax isax-add-circle me-1"></i>Add New
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
                                            <span className="upload-img d-block mb-2"><i className="isax isax-document-upload fs-24"></i></span>
                                            <h6 className="mb-1">Upload Gallery Images</h6>
                                            <p className="mb-0">Upload Feature Image First, Image size should below 5MB</p>
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
                                        <div className="summernote">
                                            <DefaultEditor value={values} onChange={onChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <button type="button" className="btn btn-light me-2">Reset</button>
                                    <button type="button" className="btn btn-primary">Add New Tour</button>
                                </div>
                            </form>
                        </div>
                        {/* /Add Tour */}

                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}

            <AddFaq />
            <EditFaq />
            <DeleteModal />

            {/* Add Itinerary */}
            <div className="modal fade" id="add_itenary">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Add New Itinerary</h5>
                            <button data-bs-dismiss="modal" aria-label="close" className="btn-close"></button>
                        </div>
                        <form >
                            <div className="modal-body">
                                <div>
                                    <label className="form-label">Itinerary</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="d-flex align-items-center justify-content-end m-0">
                                    <button type="button" data-bs-dismiss="modal" className="btn btn-sm btn-light me-2">Cancel</button>
                                    <button type="button" data-bs-dismiss="modal" className="btn btn-sm btn-primary">Add Itinerary</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Add Itinerary */}

            {/* Edit Itinerary */}
            <div className="modal fade" id="edit_itenary">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Edit Itinerary</h5>
                            <button data-bs-dismiss="modal" aria-label="close" className="btn-close"></button>
                        </div>
                        <form >
                            <div className="modal-body">
                                <div>
                                    <label className="form-label">Itinerary</label>
                                    <input type="text" className="form-control" defaultValue="Day 1, Arrival in Cusco" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="d-flex align-items-center justify-content-end m-0">
                                    <button type="button" data-bs-dismiss="modal" className="btn btn-sm btn-light me-2">Cancel</button>
                                    <button type="button" data-bs-dismiss="modal" className="btn btn-sm btn-primary">Save Itinerary</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* /Edit Itinerary */}


        </>
    )
}

export default AddTour