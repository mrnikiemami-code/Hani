"use client";
import { img_path } from "../../environment";
import React from 'react'
import Link from "next/link";
import ImageWithBasePath from '../image-with-base-path'
import Lightbox from "yet-another-react-lightbox";

const Reviews = () => {
    const [open, setOpen] = React.useState(false);
  return (
    <>
    {/* Reviews */}
    <div id="reviews">
        <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
            <h5 className="mb-3 fs-18">Reviews (45)</h5>
            <Link href="#" data-bs-toggle="modal" data-bs-target="#add_review" className="btn btn-primary btn-md mb-3"><i className="isax isax-edit-2 me-1"></i>Write a Review</Link>
        </div>
        <div className="row">
            <div className="col-md-6 d-flex">
                <div className="rating-item bg-light-200 text-center flex-fill mb-3">
                    <h6 className="fw-medium mb-3">Customer Reviews & Ratings</h6>
                    <h5 className="display-6">4.9 / 5.0</h5>
                    <div className="d-inline-flex align-items-center justify-content-center mb-3">
                        <i className="ti ti-star-filled text-primary me-1"></i>
                        <i className="ti ti-star-filled text-primary me-1"></i>
                        <i className="ti ti-star-filled text-primary me-1"></i>
                        <i className="ti ti-star-filled text-primary me-1"></i>
                        <i className="ti ti-star-filled text-primary"></i>
                    </div>
                    <p>Based On 2,459 Reviews</p>
                </div>
            </div>
            <div className="col-md-6 d-flex">
                <div className="card rating-progress shadow-none flex-fill mb-3">
                    <div className="card-body">
                        <div className="d-flex align-items-center mb-2">
                            <p className="me-2 text-nowrap mb-0">5 Star Ratings</p>
                            <div className="progress w-100" role="progressbar" aria-valuenow={90}  aria-valuemin={0} aria-valuemax={100}>
                                <div className="progress-bar bg-primary" style={{width: "90%"}}></div>
                            </div>
                            <p className="progress-count ms-2">247</p>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                            <p className="me-2 text-nowrap mb-0">4 Star Ratings</p>
                            <div className="progress mb-0 w-100" role="progressbar" aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}>
                                <div className="progress-bar bg-primary" style={{width: "80%"}}></div>
                            </div>
                            <p className="progress-count ms-2">145</p>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                            <p className="me-2 text-nowrap mb-0">3 Star Ratings</p>
                            <div className="progress mb-0 w-100" role="progressbar" aria-valuenow={70} aria-valuemin={0} aria-valuemax={100}>
                                <div className="progress-bar bg-primary" style={{width: "70%"}}></div>
                            </div>
                            <p className="progress-count ms-2">600</p>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                            <p className="me-2 text-nowrap mb-0">2 Star Ratings</p>
                            <div className="progress mb-0 w-100" role="progressbar" aria-valuenow={90} aria-valuemin={0} aria-valuemax={100}>
                                <div className="progress-bar bg-primary" style={{width: "60%"}}></div>
                            </div>
                            <p className="progress-count ms-2">560</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <p className="me-2 text-nowrap mb-0">1 Star Ratings</p>
                            <div className="progress mb-0 w-100" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100}>
                                <div className="progress-bar bg-primary" style={{width: "40%"}}></div>
                            </div>
                            <p className="progress-count ms-2">400</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="card review-item shadow-none mb-3">
            <div className="card-body p-3">
                <div className="review-info">
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <div className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-lg me-2 flex-shrink-0">
                                <ImageWithBasePath src="assets/img/users/user-05.jpg" className="rounded-circle" alt="img" />
                            </span>
                            <div>
                                <h6 className="fs-16 fw-medium mb-1">Joseph Massey</h6>
                                <div className="d-flex align-items-center flex-wrap date-info">
                                    <p className="fs-14 mb-0">2 days ago</p>
                                    <p className="fs-14 d-inline-flex align-items-center mb-0"><span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">5.0</span>Unforgettable Stay!</p>
                                </div>
                            </div>
                        </div>
                        <Link href="#" className="btn btn-outline-light btn-md d-inline-flex align-items-center mb-2"><i className="isax isax-repeat me-1"></i>Reply</Link>
                    </div>
                    <p className="mb-2">This hotel exceeded my expectations! The pool, spa, and dining options were top-notch, and the room had every amenity I could ask for. It felt like a true getaway.</p>
                    <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    slides={[
                    { src: `${img_path}assets/img/hotels/hotel-large-07.jpg` },
                    { src: `${img_path}assets/img/hotels/hotel-large-08.jpg` },
                    { src: `${img_path}assets/img/hotels/hotel-large-09.jpg` },
                    ]}
                />
                    <div className="d-flex align-items-center">
                   
                        <Link href="#" className="avatar avatar-md me-2 mb-2"  onClick={() => setOpen(true)}>
                            <ImageWithBasePath src="assets/img/hotels/hotel-gallery-01.jpg" alt="gallery-img" />
                        </Link>
                        <Link href="#" className="avatar avatar-md me-2 mb-2"  onClick={() => setOpen(true)}>
                            <ImageWithBasePath src="assets/img/hotels/hotel-gallery-02.jpg" alt="gallery-img" />
                        </Link>
                        <Link href="#" className="avatar avatar-md me-2 mb-2"  onClick={() => setOpen(true)}>
                            <ImageWithBasePath src="assets/img/hotels/hotel-gallery-03.jpg" alt="gallery-img" />
                        </Link>
                       
                    </div>
                   
                    <div className="d-inline-flex align-items-center">
                        <Link href="#" className="d-inline-flex align-items-center fs-14 me-3"><i className="isax isax-like-1 me-2"></i>21</Link>
                        <Link href="#" className="d-inline-flex align-items-center me-3"><i className="isax isax-dislike me-2"></i>50</Link>
                        <Link href="#" className="d-inline-flex align-items-center me-3"><i className="isax isax-heart5 text-danger me-2"></i>45</Link>
                    </div>
                </div>
            </div>
        </div>
        <div className="card review-item shadow-none mb-3">
            <div className="card-body p-3">
                <div className="review-info">
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <div className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-lg me-2 flex-shrink-0">
                                <ImageWithBasePath src="assets/img/users/user-21.jpg" className="rounded-circle" alt="img" />
                            </span>
                            <div>
                                <h6 className="fs-16 fw-medium mb-1">Jeffrey Jones</h6>
                                <div className="d-flex align-items-center flex-wrap date-info">
                                    <p className="fs-14 mb-0">2 days ago</p>
                                    <p className="fs-14 d-inline-flex align-items-center mb-0"><span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.0</span>Excellent service!</p>
                                </div>
                            </div>
                        </div>
                        <Link href="#" className="btn btn-outline-light btn-md d-inline-flex align-items-center mb-2"><i className="isax isax-repeat me-1"></i>Reply</Link>
                    </div>
                    <p className="mb-2">From the moment we arrived, the staff made us feel welcome. The rooms were immaculate, and every detail was thoughtfully arranged. It was the perfect blend of comfort and luxury!</p>
                    <div className="d-inline-flex align-items-center">
                        <Link href="#" className="d-inline-flex align-items-center fs-14 me-3"><i className="isax isax-like-1 me-2"></i>15</Link>
                        <Link href="#" className="d-inline-flex align-items-center me-3"><i className="isax isax-dislike me-2"></i>30</Link>
                        <Link href="#" className="d-inline-flex align-items-center me-3"><i className="isax isax-heart5 text-danger me-2"></i>52</Link>
                    </div>
                </div>
            </div>
        </div>
        <div className="card review-item shadow-none mb-3">
            <div className="card-body p-3">
                <div className="review-info">
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <div className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-lg me-2 flex-shrink-0">
                                <ImageWithBasePath src="assets/img/users/user-26.jpg" className="rounded-circle" alt="img" />
                            </span>
                            <div>
                                <h6 className="fs-16 fw-medium mb-1">Jessie Alves</h6>
                                <div className="d-flex align-items-center flex-wrap date-info">
                                    <p className="fs-14 mb-0">2 days ago</p>
                                    <p className="fs-14 d-inline-flex align-items-center mb-0"><span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">5.0</span>Convenient Location!</p>
                                </div>
                            </div>
                        </div>
                        <Link href="#" className="btn btn-outline-light btn-md d-inline-flex align-items-center mb-2"><i className="isax isax-repeat me-1"></i>Reply</Link>
                    </div>
                    <p className="mb-2">The location was perfect for exploring the city, and the views from our room were breathtaking. It made our trip so much more enjoyable to stay somewhere central and scenic</p>
                    <div className="d-inline-flex align-items-center">
                        <Link href="#" className="d-inline-flex align-items-center fs-14 me-3"><i className="isax isax-like-1 me-2"></i>13</Link>
                        <Link href="#" className="d-inline-flex align-items-center me-3"><i className="isax isax-dislike me-2"></i>38</Link>
                        <Link href="#" className="d-inline-flex align-items-center me-3"><i className="isax isax-heart5 text-danger me-2"></i>75</Link>
                    </div>
                </div>
                <div className="review-info reply mt-4 p-3">
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <div className="d-flex align-items-center mb-2">
                            <span className="avatar avatar-lg me-2 flex-shrink-0">
                                <ImageWithBasePath src="assets/img/users/user-25.jpg" className="rounded-circle" alt="img" />
                            </span>
                            <div>
                                <h6 className="fs-16 fw-medium mb-1">Adrian Hendriques</h6>
                                <div className="d-flex align-items-center flex-wrap date-info">
                                    <p className="fs-14 mb-0">2 days ago</p>
                                    <p className="fs-14 d-inline-flex align-items-center mb-0"><span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">2.0</span>Excellent service!</p>
                                </div>
                            </div>
                        </div>
                        <Link href="#" className="btn btn-outline-light btn-md d-inline-flex align-items-center me-2"><i className="isax isax-repeat me-1"></i>Reply</Link>
                    </div>
                    <p className="mb-2">Thank you so much for your kind words! We're thrilled to hear that our location and views made your trip even more enjoyable. We hope to welcome you back soon for another scenic stay!</p>
                    <div className="d-inline-flex align-items-center">
                        <Link href="#" className="d-inline-flex align-items-center fs-14 me-3"><i className="isax isax-like-1 me-2"></i>10</Link>
                        <Link href="#" className="d-inline-flex align-items-center me-3"><i className="isax isax-dislike me-2"></i>21</Link>
                        <Link href="#" className="d-inline-flex align-items-center me-3"><i className="isax isax-heart5 text-danger me-2"></i>46</Link>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-center mb-4 mb-xl-0">
            <Link href="#" className="btn btn-primary btn-md d-inline-flex align-items-center justify-content-center mt-2">See all 4,078 reviews<i className="isax isax-arrow-right-3 ms-1"></i></Link>
        </div>
    </div>
    {/* /Reviews */}
    <div className="modal fade" id="add_review">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header d-flex align-items-center justify-content-between">
                    <h5>Write a Review</h5>
                    <Link href="#" data-bs-dismiss="modal" aria-label="Close">
                        <i className="ti ti-x fs-16"></i>
                    </Link>
                </div>
                <form>
                    <div className="modal-body pb-0">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="mb-3">
                                    <label className="form-label">Your Rating <span className="text-danger">*</span></label>
                                    <div className="selection-wrap">
                                        <div className="d-inline-block">
                                        <div className="selection-wrap">
                                            <div className="d-inline-block">
                                                <div className="rating-selction">
                                                    <input type="radio" name="rating" defaultValue="5" id="rating15" />
                                                    <label htmlFor="rating15"><i className="fa-solid fa-star"></i></label>
                                                    <input type="radio" name="rating" defaultValue="4" id="rating14" />
                                                    <label htmlFor="rating14"><i className="fa-solid fa-star"></i></label>
                                                    <input type="radio" name="rating" defaultValue="3" id="rating13" />
                                                    <label htmlFor="rating13"><i className="fa-solid fa-star"></i></label>
                                                    <input type="radio" name="rating" defaultValue="2" id="rating12" />
                                                    <label htmlFor="rating12"><i className="fa-solid fa-star"></i></label>
                                                    <input type="radio" name="rating" defaultValue="1" id="rating11" />
                                                    <label htmlFor="rating11"><i className="fa-solid fa-star"></i></label>
                                                </div>
                                            </div>
                                        </div>
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Name <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Email <span className="text-danger">*</span></label>
                                    <input type="email" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="mb-3">
                                    <label className="form-label">Write Your Review <span className="text-danger">*</span></label>
                                    <textarea className="form-control" rows={3}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="d-flex align-items-center justify-content-end m-0">
                            <button type="button" data-bs-dismiss="modal" className="btn btn-primary btn-md"><i className="isax isax-edit-2 me-1"></i>Submit Review</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Reviews