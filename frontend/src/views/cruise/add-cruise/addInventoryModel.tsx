"use client";


const AddInventoryModel = () => {
    return (
        <div>

            {/* Iternary Modal */}
            <div
                className="modal fade"
                id="add_iternary"
                tabIndex={-1}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Add New Itinerary</h5>
                            <button
                                data-bs-dismiss="modal"
                                aria-label="close"
                                className="btn-close"
                            />
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">
                                        Itinerary <span className="text-danger"> *</span>
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="d-flex align-items-center justify-content-end m-0">
                                    <button
                                        type="button"
                                        data-bs-dismiss="modal"
                                        className="btn btn-sm btn-light me-2"
                                    >
                                        Cancel
                                    </button>
                                    <button data-bs-dismiss="modal" className="btn btn-sm btn-primary">
                                        Add Itinerary
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* /Iternary Modal */}


        </div>
    )
}

export default AddInventoryModel
