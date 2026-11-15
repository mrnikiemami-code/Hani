import Link from 'next/link'
import ImageWithBasePath from '@/core/imageWithBasePath'
import { Modal } from 'react-bootstrap';

const PaymentModal = ({ addModal, setAddModal,title,link }: any) => {

    const handleClose = () => {
        setAddModal(false);
    };

    return (
        <div>
            <>
                <Modal show={addModal} onHide={handleClose} centered size="sm">
                    <div className="modal-body">
                        <div>
                            <div className="booking-icon text-center mb-3">
                                <ImageWithBasePath
                                    src="assets/img/icons/tick-circle.svg"
                                    alt="icon"
                                    className="img-fluid"
                                />
                            </div>
                            <h5 className="text-center mb-3">Payment Successful</h5>
                            <div className="text-center mb-4">
                                <p>
                                    Booking on <strong>“{title}”</strong> has been successful
                                    with Reference Number <span className="text-primary"> #12559845</span>
                                </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <Link
                                    href={link}
                                    className="btn btn-primary d-flex flex-shrink-0"
                                >
                                    View Booking Details
                                </Link>
                            </div>
                        </div>
                    </div>

                </Modal>
            </>

        </div>
    )
}

export default PaymentModal
