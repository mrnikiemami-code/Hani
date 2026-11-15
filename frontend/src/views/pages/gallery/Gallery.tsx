"use client";
import { img_path } from "../../../environment";

import React from 'react'
import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Lightbox from "yet-another-react-lightbox";
import ImageWithBasePath from '../../../components/image-with-base-path';
import Link from "next/link";

const Gallery = () => {
    const routes = all_routes
    const [open, setOpen] = React.useState(false);
    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Gallery',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Pages',
            active: false,
        },
        {
            label: 'Gallery',
            active: true,
        },
    ];
    return (
        <>
            <Breadcrumb
                title="Cruise"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-01"
            />
            <div className="content">
                <div className="container">
                    <Lightbox
                        open={open}
                        close={() => setOpen(false)}
                        slides={[
                            { src: `${img_path}assets/img/gallery/gallery-01.jpg` },
                            { src: `${img_path}assets/img/gallery/gallery-02.jpg` },
                            { src: `${img_path}assets/img/gallery/gallery-03.jpg` },
                            { src: `${img_path}assets/img/gallery/gallery-04.jpg` },
                            { src: `${img_path}assets/img/gallery/gallery-05.jpg` },
                            { src: `${img_path}assets/img/gallery/gallery-06.jpg` },
                            { src: `${img_path}assets/img/gallery/gallery-07.jpg` },
                            { src: `${img_path}assets/img/gallery/gallery-08.jpg` },
                            { src: `${img_path}assets/img/gallery/gallery-09.jpg` },
                            { src: `${img_path}assets/img/gallery/gallery-10.jpg` },
                            { src: `${img_path}assets/img/gallery/gallery-11.jpg` },
                            { src: `${img_path}assets/img/gallery/gallery-12.jpg` },
                            { src: `${img_path}assets/img/gallery/gallery-13.jpg` },
                            { src: `${img_path}assets/img/gallery/gallery-14.jpg` },
                            { src: `${img_path}assets/img/gallery/gallery-15.jpg` },
                            { src: `${img_path}assets/img/gallery/gallery-16.jpg` },
                        ]}
                    />
                    {/* Gallery Details */}
                    <div className="row row-gap-4">
                        <div className="col-lg-3">
                            <div className="gallery-card">
                                <div className="gallery-body">
                                    <div className="img-wrap">
                                        <ImageWithBasePath src="assets/img/gallery/gallery-01.jpg" alt="img" />
                                        <div className="img-overlay-1">
                                            <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} href="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="gallery-card">
                                <div className="gallery-body">
                                    <div className="img-wrap">
                                        <ImageWithBasePath src="assets/img/gallery/gallery-02.jpg" alt="img" />
                                        <div className="img-overlay-1">
                                            <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} href="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="gallery-card">
                                <div className="gallery-body">
                                    <div className="img-wrap">
                                        <ImageWithBasePath src="assets/img/gallery/gallery-03.jpg" alt="img" />
                                        <div className="img-overlay-1">
                                            <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} href="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="gallery-card">
                                <div className="gallery-body">
                                    <div className="img-wrap">
                                        <ImageWithBasePath src="assets/img/gallery/gallery-04.jpg" alt="img" />
                                        <div className="img-overlay-1">
                                            <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} href="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="gallery-card">
                                <div className="gallery-body">
                                    <div className="img-wrap">
                                        <ImageWithBasePath src="assets/img/gallery/gallery-05.jpg" alt="img" />
                                        <div className="img-overlay-1">
                                            <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} href="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="gallery-card">
                                <div className="gallery-body">
                                    <div className="img-wrap">
                                        <ImageWithBasePath src="assets/img/gallery/gallery-06.jpg" alt="img" />
                                        <div className="img-overlay-1">
                                            <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} href="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="gallery-card">
                                <div className="gallery-body">
                                    <div className="img-wrap">
                                        <ImageWithBasePath src="assets/img/gallery/gallery-07.jpg" alt="img" />
                                        <div className="img-overlay-1">
                                            <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} href="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="gallery-card">
                                <div className="gallery-body">
                                    <div className="img-wrap">
                                        <ImageWithBasePath src="assets/img/gallery/gallery-08.jpg" alt="img" />
                                        <div className="img-overlay-1">
                                            <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} href="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="gallery-card">
                                <div className="gallery-body">
                                    <div className="img-wrap">
                                        <ImageWithBasePath src="assets/img/gallery/gallery-09.jpg" alt="img" />
                                        <div className="img-overlay-1">
                                            <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} href="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="gallery-card">
                                <div className="gallery-body">
                                    <div className="img-wrap">
                                        <ImageWithBasePath src="assets/img/gallery/gallery-10.jpg" alt="img" />
                                        <div className="img-overlay-1">
                                            <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} href="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="gallery-card">
                                <div className="gallery-body">
                                    <div className="img-wrap">
                                        <ImageWithBasePath src="assets/img/gallery/gallery-11.jpg" alt="img" />
                                        <div className="img-overlay-1">
                                            <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} href="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="gallery-card">
                                <div className="gallery-body">
                                    <div className="img-wrap">
                                        <ImageWithBasePath src="assets/img/gallery/gallery-12.jpg" alt="img" />
                                        <div className="img-overlay-1">
                                            <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} href="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="gallery-card">
                                <div className="gallery-body">
                                    <div className="img-wrap">
                                        <ImageWithBasePath src="assets/img/gallery/gallery-13.jpg" alt="img" />
                                        <div className="img-overlay-1">
                                            <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} href="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="gallery-card">
                                <div className="gallery-body">
                                    <div className="img-wrap">
                                        <ImageWithBasePath src="assets/img/gallery/gallery-14.jpg" alt="img" />
                                        <div className="img-overlay-1">
                                            <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} href="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="gallery-card">
                                <div className="gallery-body">
                                    <div className="img-wrap">
                                        <ImageWithBasePath src="assets/img/gallery/gallery-15.jpg" alt="img" />
                                        <div className="img-overlay-1">
                                            <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} href="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="gallery-card">
                                <div className="gallery-body">
                                    <div className="img-wrap">
                                        <ImageWithBasePath src="assets/img/gallery/gallery-16.jpg" alt="img" />
                                        <div className="img-overlay-1">
                                            <Link className="gallery-img" data-fancybox="gallery-img" onClick={() => setOpen(true)} href="#" title="Demo 01"><span className="gallery-eye-icon rounded-circle bg-primary d-flex align-items-center justify-content-center"><i className="ti ti-eye text-white"></i></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Gallery Details */}

                </div>
            </div>
        </>
    )
}

export default Gallery