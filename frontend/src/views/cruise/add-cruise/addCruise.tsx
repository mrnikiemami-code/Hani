"use client";
import React, { useState } from 'react'
import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import { CountryOption, CruiseBedType, CruiseName, CruiseSleep, CruiseType, ViewType } from '../../../core/data/mock/selectOption';
import CustomSelect from '../../../components/common-select/commonSelect';
import { DatePicker } from '../../../components/common-date-picker/appDatePicker'
import DefaultEditor from 'react-simple-wysiwyg';
import AddFaq from '../../../components/modals/addFaq';
import EditFaq from '../../../components/modals/editFaq';
import DeleteModal from '../../../components/modals/deleteModal';
import ImageWithBasePath from '../../../components/image-with-base-path';
import AddInventoryModel from './addInventoryModel';

const AddCruise = () => {

    const routes = all_routes;

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Add Cruise',
            active: false,
            link: routes.home1
        },

        {
            label: 'Add Cruise',
            active: true,
        },
    ];



    const [highlights, setHighlights] = useState<string[]>([]);

    const addHighlight = () => {
        setHighlights([...highlights, ""]); // Add an empty highlight
    };

    const removeHighlight = (index: number) => {
        setHighlights(highlights.filter((_, i) => i !== index)); // Remove the highlight by index
    };


    const [values, setValue] = React.useState();
    function onChange(e: any) {
        setValue(e.target.value);
    }

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
            <Breadcrumb title="Add Cruise" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-06" />

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
                                    data-bs-target="#add_cruise"
                                    aria-selected="true"
                                    role="tab"
                                >
                                    Add New Cruise
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="nav-link"
                                    data-bs-toggle="tab"
                                    data-bs-target="#add_cabin"
                                    aria-selected="false"
                                    role="tab"
                                    tabIndex={-1}
                                >
                                    Add New Cabin
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content">
                        {/* Add New Cruise */}
                        <div
                            className="tab-pane fade active show"
                            id="add_cruise"
                            role="tabpanel"
                        >
                            <div className="row">
                                {/* Sidebar */}
                                <div className="col-lg-3 ">
                                    <div className="card border-0 mb-4 mb-lg-0 theiaStickySidebar">
                                        <div className="card-body">
                                            <div>
                                                <h5 className="mb-3">Add Cruise</h5>
                                                <ul className="add-tab-list" id='list-example'>
                                                    <li>
                                                        <a href="#basic_info" className="active">
                                                            Basic Info
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#specifications">Specifications</a>
                                                    </li>
                                                    <li>
                                                        <a href="#additional_service">Additional Service</a>
                                                    </li>
                                                    <li>
                                                        <a href="#description">Description</a>
                                                    </li>
                                                    <li>
                                                        <a href="#amenties">Amenities</a>
                                                    </li>
                                                    <li>
                                                        <a href="#itenary">Itinerary</a>
                                                    </li>
                                                    <li>
                                                        <a href="#location">Locations</a>
                                                    </li>
                                                    <li>
                                                        <a href="#faq">FAQ</a>
                                                    </li>
                                                    <li>
                                                        <a href="#gallery">Gallery</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Sidebar */}
                                <div className="col-lg-9">
                                    <form data-bs-target="#list-example" data-bs-smooth-scroll="true" >
                                        <div className="card shadow-none" id="basic_info">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h6 className="fs-18">Basic Info</h6>
                                                </div>
                                            </div>
                                            <div className="card-body pb-1">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">Cruise Title</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Cruise Type</label>
                                                            <CustomSelect
                                                                options={CruiseType}
                                                                className="select d-flex"
                                                                placeholder="Select"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Launched On</label>
                                                            <div className="input-icon-end position-relative">
                                                                <DatePicker
                                                                    className="form-control datetimepicker"
                                                                    placeholder="dd/mm/yyyy"
                                                                />
                                                                <span className="input-icon-addon">
                                                                    <i className="isax isax-calendar" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card shadow-none" id="specifications">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h6 className="fs-18">Specifications</h6>
                                                </div>
                                            </div>
                                            <div className="card-body pb-1">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Lenght</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Staffs</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Beam</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Weight</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Dining Crew</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Speed</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card shadow-none" id="additional_service">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h5 className="fs-18">Additional Service</h5>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="add-service-info">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">
                                                                    Name of the Service
                                                                </label>
                                                                <input type="text" className="form-control" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">Price</label>
                                                                <input type="text" className="form-control" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {highlights.map((_highlight, index) => (
                                                        <div className="row service-info" key={index}>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Name of the Service</label>
                                                                    <input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Price</label>
                                                                    <div className="d-flex align-items-center">
                                                                        <input type="text" className="form-control" />
                                                                        <Link href="#" className="text-danger trash-icon d-flex align-items-center justify-content-center ms-3" onClick={() => removeHighlight(index)}>
                                                                            <i className="isax isax-trash" />
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    )
                                                    )}
                                                </div>
                                                <div>
                                                    <Link
                                                        href="#"
                                                        className="btn btn-primary btn-sm add-service"
                                                        onClick={addHighlight}
                                                    >
                                                        <i className="isax isax-add-circle me-1" />
                                                        Add New
                                                    </Link>
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
                                        <div className="card shadow-none" id="amenties">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h5 className="fs-18">Cruise Amenities</h5>
                                                </div>
                                            </div>
                                            <div className="card-body pb-1">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-6">
                                                        <h6 className="fs-16 mb-2">Dining Options</h6>
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-01"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-01"
                                                                >
                                                                    Room Service
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-02"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-02"
                                                                >
                                                                    Extra legroom seats
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-03"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-03"
                                                                >
                                                                    Cafes and Bakeries
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-04"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-04"
                                                                >
                                                                    Specialty Restaurants
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-05"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-05"
                                                                >
                                                                    Buffet Restaurants
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <h6 className="fs-16 mb-2">Entertainment</h6>
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-07"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-07"
                                                                >
                                                                    Live Shows
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-08"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-08"
                                                                >
                                                                    Movie Theaters
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-09"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-09"
                                                                >
                                                                    Nightclubs &amp; Bars
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-010"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-010"
                                                                >
                                                                    Casino
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-011"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-011"
                                                                >
                                                                    Buffet Restaurants
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <h6 className="fs-16 mb-2">Sports &amp; Fitness</h6>
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-013"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-013"
                                                                >
                                                                    Pools
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-014"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-014"
                                                                >
                                                                    Fitness Centers
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-015"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-015"
                                                                >
                                                                    Sports Courts
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-016"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-016"
                                                                >
                                                                    Rock Climbing Walls
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-017"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-017"
                                                                >
                                                                    Buffet Restaurants
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <h6 className="fs-16 mb-2">
                                                            Wellness &amp; Relaxation
                                                        </h6>
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-018"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-018"
                                                                >
                                                                    Spas
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-019"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-019"
                                                                >
                                                                    Thermal Suites
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-020"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-020"
                                                                >
                                                                    Adult-Only Retreats
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-021"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-021"
                                                                >
                                                                    Buffet Restaurants
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-022"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-022"
                                                                >
                                                                    Buffet Restaurants
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <h6 className="fs-16 mb-2">Family &amp; Kids</h6>
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-023"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-023"
                                                                >
                                                                    Kids' Clubs
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-024"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-024"
                                                                >
                                                                    Arcades
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-025"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-025"
                                                                >
                                                                    Water Parks
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-026"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-026"
                                                                >
                                                                    Casino
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-027"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-027"
                                                                >
                                                                    Buffet Restaurants
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <h6 className="fs-16 mb-2">Accommodations</h6>
                                                        <div className="mb-3">
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-028"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-028"
                                                                >
                                                                    Cabins
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-029"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-029"
                                                                >
                                                                    Private Balconies
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-030"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-030"
                                                                >
                                                                    Concierge and Butler Service
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-031"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-031"
                                                                >
                                                                    Ocean View Staterooms
                                                                </label>
                                                            </div>
                                                            <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                                <input
                                                                    className="form-check-input ms-0 mt-0"
                                                                    type="checkbox"
                                                                    id="service-032"
                                                                />
                                                                <label
                                                                    className="form-check-label ms-2"
                                                                    htmlFor="service-032"
                                                                >
                                                                    Suites with Personalized Service
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card shadow-none" id="itenary">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h5 className="fs-18">Itinerary</h5>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="card shadow-none mb-3">
                                                    <div className="card-body px-3 py-2">
                                                        <div className=" d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                                                            <h6>
                                                                <Link href="#">
                                                                    Day 1, Kickoff in Los Angeles
                                                                </Link>
                                                            </h6>
                                                            <div className="d-flex align-items-center">
                                                                <Link
                                                                    href="#"
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
                                                        className="btn btn-primary btn-sm"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#add_iternary"
                                                    >
                                                        <i className="isax isax-add-circle me-1" />
                                                        Add New
                                                    </Link>
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
                                                        className="btn btn-primary btn-sm"
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
                                        <div className="d-flex align-items-center justify-content-center">
                                            <button type="button" className="btn btn-light me-2">
                                                Reset
                                            </button>
                                            <button type="submit" className="btn btn-primary">
                                                Add New Cruise
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* /Add New Cruise */}
                        {/* Add New Cabin */}
                        <div className="tab-pane fade" id="add_cabin" role="tabpanel">
                            <div className="row">
                                {/* Sidebar */}
                                <div className="col-lg-3 theiaStickySidebar">
                                    <div className="card border-0">
                                        <div className="card-body">
                                            <div>
                                                <h5 className="mb-3">Add Cabin</h5>
                                                <ul className="add-tab-list" id='list-example-2'>
                                                    <li>
                                                        <a href="#basic_info_2" className="active">
                                                            Basic Info
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#description_2">Description</a>
                                                    </li>
                                                    <li>
                                                        <a href="#specification">Specifications</a>
                                                    </li>
                                                    <li>
                                                        <a href="#popular_amenities_2">Amenities</a>
                                                    </li>
                                                    <li>
                                                        <a href="#gallery_2">Gallery</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Sidebar */}
                                <div className="col-lg-9">
                                    <form data-bs-spy="scroll" data-bs-target="#list-example-2" data-bs-smooth-scroll="true" >
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
                                                            <label className="form-label">Cabin Name</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">View Type</label>
                                                            <CustomSelect
                                                                options={ViewType}
                                                                className="select d-flex"
                                                                placeholder="Select"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Cruise Name</label>
                                                            <CustomSelect
                                                                options={CruiseName}
                                                                className="select d-flex"
                                                                placeholder="Select"
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
                                                <DefaultEditor value={values} onChange={onChange} />
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
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Cabin Size</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Sleeps</label>
                                                            <CustomSelect
                                                                options={CruiseSleep}
                                                                className="select d-flex"
                                                                placeholder="Select"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Bed Type</label>
                                                            <CustomSelect
                                                                options={CruiseBedType}
                                                                className="select d-flex"
                                                                placeholder="Select"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Views</label>
                                                            <CustomSelect
                                                                options={ViewType}
                                                                className="select d-flex"
                                                                placeholder="Select"
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
                                        <div className="card shadow-none" id="popular_amenities_2">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h5 className="fs-18">Cruise Amenities</h5>
                                                </div>
                                            </div>
                                            <div className="card-body pb-1">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-6">
                                                        <h6 className="fs-16 mb-2">Dining Options</h6>
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
                                                                    Room Service
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
                                                                    Extra legroom seats
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
                                                                    Cafes and Bakeries
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <h6 className="fs-16 mb-2">Entertainment</h6>
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
                                                                    Live Shows
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
                                                                    Movie Theaters
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
                                                                    Nightclubs &amp; Bars
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <h6 className="fs-16 mb-2">Sports &amp; Fitness</h6>
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
                                                                    Pools
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
                                                                    Fitness Centers
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
                                                                    Sports Courts
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <h6 className="fs-16 mb-2">
                                                            Wellness &amp; Relaxation
                                                        </h6>
                                                        <div className="mb-3">
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
                                                                    Spas
                                                                </label>
                                                            </div>
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
                                                                    Thermal Suites
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
                                                                    Adult-Only Retreats
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <h6 className="fs-16 mb-2">Family &amp; Kids</h6>
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
                                                                    Kids' Clubs
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
                                                                    Arcades
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
                                                                    Water Parks
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <h6 className="fs-16 mb-2">Accommodations</h6>
                                                        <div className="mb-3">
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
                                                                    Cabins
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
                                                                    Private Balconies
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
                                                                    Concierge and Butler Service
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
                        {/* /Add New Cabin */}
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}
            <AddFaq />
            <EditFaq />
            <DeleteModal />
            <AddInventoryModel />
        </div>
    )
}

export default AddCruise
