"use client";

import Link from "next/link";

const AgentListingModal = () => {

    return (
        <>
            {/* Inactive Modal */}
            <div
                className="modal fade"
                id="inactive_list"
                tabIndex={-1}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="text-center">
                                <h5 className="mb-3">Inactive Listing</h5>
                                <p className="mb-3">
                                    Are you sure you want to mark this listing as inactive and keep it
                                    unavailable
                                </p>
                                <div className="d-flex align-items-center justify-content-center">
                                    <Link href="#" data-bs-dismiss="modal" className="btn btn-light me-2">
                                        No
                                    </Link>
                                    <Link href="#" data-bs-dismiss="modal" className="btn btn-primary">
                                        Yes
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Inactive Modal */}
            {/* Active Modal */}
            <div className="modal fade" id="active_list" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="text-center">
                                <h5 className="mb-3">Active Listing</h5>
                                <p className="mb-3">
                                    Are you sure you want to mark this listing as active and keep it
                                    available?
                                </p>
                                <div className="d-flex align-items-center justify-content-center">
                                    <Link href="#" data-bs-dismiss="modal" className="btn btn-light me-2">
                                        No
                                    </Link>
                                    <Link href="#" data-bs-dismiss="modal" className="btn btn-primary">
                                        Yes
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Active Modal */}
            {/* Delete Modal */}
            <div className="modal fade" id="delete-list" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="text-center">
                                <h5 className="mb-3">Delete Listing</h5>
                                <p className="mb-3">
                                    Are you sure you want to delete this listing?
                                </p>
                                <div className="d-flex align-items-center justify-content-center">
                                    <Link href="#" data-bs-dismiss="modal" className="btn btn-light me-2">
                                        No
                                    </Link>
                                    <Link href="#" data-bs-dismiss="modal" className="btn btn-primary">
                                        Yes, Delete
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  Delete Modal */}
        </>

    )
}

export default AgentListingModal
