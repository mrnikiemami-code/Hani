"use client";
import { useState } from 'react'
import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import { Access, Brake, CarBody,  CountryOption, Door, FuelType, Steering, Transmission, VehicleType } from '../../../core/data/mock/selectOption';
import CustomSelect from '../../../components/common-select/commonSelect';
import ImageWithBasePath from '../../../components/image-with-base-path';
import AddFaq from '../../../components/modals/addFaq';
import EditFaq from '../../../components/modals/editFaq';
import DeleteModal from '../../../components/modals/deleteModal';
import FormEditors from '../../../components/text-editor/textEditor';


const AddCar = () => {

    const routes = all_routes
    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Add Car',
            active: false,
            link: routes.home1
        },
        {
            label: 'Add Car',
            active: true,
        },
    ];

    const [_defaultDate] = useState(new Date());

    const [highlights, setHighlights] = useState<string[]>([]);

    const addHighlight = () => {
        setHighlights([...highlights, ""]); // Add an empty highlight
    };

    const removeHighlight = (index: number) => {
        setHighlights(highlights.filter((_, i) => i !== index)); // Remove the highlight by index
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
            <Breadcrumb title="Add Car" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-03" />


            <>
                {/* Page Wrapper */}
                <div className="content">
                    <div className="container">
                        <div className="row">
                            {/* Sidebar */}
                            <div className="col-lg-3">
                                <div className="card border-0 mb-4 mb-lg-0 theiaStickySidebar">
                                    <div className="card-body">
                                        <div>
                                            <h5 className="mb-3">Add Car</h5>
                                            <ul className="add-tab-list" id='list-example-3'>
                                                <li>
                                                    <Link href="#basic_info" className="active">
                                                        Basic Info
                                                    </Link>
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
                                                    <a href="#features">Features</a>
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
                            {/* Add Car */}
                            <div className="col-lg-9">
                                <form action={routes.carGrid} data-bs-spy="scroll" data-bs-target="#list-example-3" data-bs-smooth-scroll="true">
                                    {/* Basic Info */}
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
                                                        <label className="form-label">Car Title</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-4 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Make</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-4 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Model</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-4 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Vehicle Type</label>
                                                        <CustomSelect
                                                            options={VehicleType}
                                                            className="select d-flex"
                                                            placeholder="Select"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Basic Info */}
                                    {/* Specifications */}
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
                                                        <label className="form-label">Transmission</label>
                                                        <CustomSelect
                                                            options={Transmission}
                                                            className="select d-flex"
                                                            placeholder="Select"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Make</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Body</label>
                                                        <CustomSelect
                                                            options={CarBody}
                                                            className="select d-flex"
                                                            placeholder="Select"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Fuel Type</label>
                                                        <CustomSelect
                                                            options={FuelType}
                                                            className="select d-flex"
                                                            placeholder="Select"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Mileage</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Model Year</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">AC</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Doors</label>
                                                        <CustomSelect
                                                            options={Door}
                                                            className="select d-flex"
                                                            placeholder="Select"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Steering</label>
                                                        <CustomSelect
                                                            options={Steering}
                                                            className="select d-flex"
                                                            placeholder="Select"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Brake</label>
                                                        <CustomSelect
                                                            options={Brake}
                                                            className="select d-flex"
                                                            placeholder="Select"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Engine (Hp)</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Access</label>
                                                        <CustomSelect
                                                            options={Access}
                                                            className="select d-flex"
                                                            placeholder="Select"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Specifications */}
                                    {/* Additional Service */}
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
                                                    <div className="row service-info">
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

                                                ))}

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
                                    {/* /Additional Service */}
                                    {/* Description */}
                                    <div className="card shadow-none" id="description">
                                        <div className="card-header">
                                            <h5 className="fs-18">Description</h5>
                                        </div>
                                        <div className="card-body">
                                        <FormEditors />
                                        </div>
                                    </div>
                                    {/* /Description */}
                                    {/* Location */}
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
                                    {/* /Location */}
                                    {/* Features */}
                                    <div className="card shadow-none" id="features">
                                        <div className="card-header">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <h5 className="fs-18">Features</h5>
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
                                                                Multi-zone A/C
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
                                                                Heated front seats
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
                                                                Hiking &amp; Nature Walks
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
                                                                Andriod Auto
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
                                                                Premium sound system
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
                                                                Bluetooth
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
                                                                Keyles Start
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
                                                                Memory seat
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
                                                                Memory seat
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
                                                                Adaptive Control
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
                                                                Intermittent wipers
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
                                                                4 power windows
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Features */}
                                    {/* FAQ */}
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
                                    {/* /FAQ */}
                                    {/* Gallery */}
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
                                    {/* /Gallery */}
                                    <div className="d-flex align-items-center justify-content-center">
                                        <button type="button" className="btn btn-light me-2">
                                            Reset
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Add New Car
                                        </button>
                                    </div>
                                </form>
                            </div>
                            {/* /Add Car */}
                        </div>
                    </div>
                </div>
                {/* /Page Wrapper */}
            </>

            <AddFaq />
            <EditFaq />
            <DeleteModal />
        </div>
    )
}

export default AddCar
