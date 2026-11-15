"use client";

import Link from "next/link";

const EditReviewModal = () => {
    return (
        <>
            {/* Edit Review */}
            <div className="modal fade" id="edit_review">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Edit Review</h5>
                            <Link
                                href="#"
                                data-bs-dismiss="modal"
                                className="btn-close text-dark"
                            />
                        </div>
                        <form>
                            <div className="modal-body pb-0">
                                <div className="mb-3">
                                    <label className="form-label">
                                        Your Rating <span className="text-danger">*</span>
                                    </label>
                                    <div className="selection-wrap">
                                        <div className="d-inline-block">
                                            <div className="rating-selction">
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    defaultValue={5}
                                                    id="rating5"
                                                    defaultChecked
                                                />
                                                <label htmlFor="rating5">
                                                    <i className="fa-solid fa-star" />
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    defaultValue={4}
                                                    id="rating4"
                                                    defaultChecked
                                                />
                                                <label htmlFor="rating4">
                                                    <i className="fa-solid fa-star" />
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    defaultValue={3}
                                                    id="rating3"
                                                    defaultChecked
                                                />
                                                <label htmlFor="rating3">
                                                    <i className="fa-solid fa-star" />
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    defaultValue={2}
                                                    id="rating2"
                                                />
                                                <label htmlFor="rating2">
                                                    <i className="fa-solid fa-star" />
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    defaultValue={1}
                                                    id="rating1"
                                                />
                                                <label htmlFor="rating1">
                                                    <i className="fa-solid fa-star" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Write Your Review <span className="text-danger">*</span>
                                    </label>
                                    <textarea
                                        className="form-control"
                                        rows={3}
                                        defaultValue={
                                            "Excellent service! It was a good location however the cocoon concept was weird. No tables, chairs etc was difficult as everything went on the floor."
                                        }
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <Link
                                    href="#"
                                    className="btn btn-md btn-light"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </Link>
                                <Link href="#" data-bs-dismiss="modal" className="btn btn-md btn-primary">
                                    Save Changes
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* /Edit Review */}
        </>

    )
}

export default EditReviewModal
