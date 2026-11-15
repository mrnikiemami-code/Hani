"use client";

import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';

const TermsConditions = () => {

    const routes = all_routes

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Terms & Conditions',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Pages',
            active: true,
        },
        {
            label: 'Terms & Conditions',
            active: true,
        },
    ];

    return (
        <div>
            <Breadcrumb
                title="Terms & Conditions"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-02"
            />


            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    {/* Terms Condition */}
                    <p>
                        Welcome to Travel DreamsTour! By accessing or using our website and
                        services, you agree to comply with and be bound by the following terms
                        and conditions. Please read these carefully.
                    </p>
                    {/* Terms 1 */}
                    <h6 className="mb-2">1. Acceptance of Terms</h6>
                    <p>
                        By using our services, you confirm that you are at least 18 years old
                        and have the legal capacity to enter into agreements.
                    </p>
                    {/* /Terms 1 */}
                    {/* Terms2 */}
                    <h6 className="mb-2">2. Services Offered</h6>
                    <p>
                        Travel Wecditr provides a platform for booking travel-related services,
                        including flights, hotels, car rentals, and travel insurance. All
                        bookings are subject to availability.
                    </p>
                    {/* /Terms2 */}
                    {/* Terms3 */}
                    <h6 className="mb-2">3. Pricing and Payments</h6>
                    <div className="mb-4">
                        <p className="mb-1">
                            <i className="ti ti-square-rotated-filled text-primary me-2" /> Prices
                            displayed on our website are subject to change and may not include
                            taxes and fees.
                        </p>
                        <p className="mb-1">
                            <i className="ti ti-square-rotated-filled text-primary me-2" />{" "}
                            Payment must be made in full at the time of booking. We accept various
                            payment methods as specified on our site.
                        </p>
                        <p>
                            <i className="ti ti-square-rotated-filled text-primary me-2" /> You
                            are responsible for ensuring that your payment information is
                            accurate.
                        </p>
                    </div>
                    {/* /Terms3 */}
                    {/* Terms4 */}
                    <h6 className="mb-2">4. Booking Modifications and Cancellations</h6>
                    <div className="mb-4">
                        <p className="mb-1">
                            <i className="ti ti-square-rotated-filled text-primary me-2" /> Any
                            modifications to bookings must be requested through customer support
                            and are subject to applicable fees.
                        </p>
                        <p>
                            <i className="ti ti-square-rotated-filled text-primary me-2" />{" "}
                            Cancellations are governed by the cancellation policies of the
                            respective service providers (airlines, hotels, etc.). Please review
                            their policies carefully before booking.
                        </p>
                    </div>
                    {/* /Terms4 */}
                    {/* Terms5 */}
                    <h6 className="mb-2">5.User Responsibilities</h6>
                    <div>
                        <p className="mb-1">
                            <i className="ti ti-square-rotated-filled text-primary me-2" /> You
                            agree to provide accurate and complete information during the booking
                            process.
                        </p>
                        <p>
                            <i className="ti ti-square-rotated-filled text-primary me-2" /> You
                            are responsible for ensuring that you have the necessary travel
                            documents (e.g., passports, visas) and comply with all relevant
                            regulations.
                        </p>
                    </div>
                    {/* /Terms5 */}
                    {/* /Terms Condition*/}
                </div>
            </div>
            {/* /Page Wrapper */}


        </div>
    )
}

export default TermsConditions
