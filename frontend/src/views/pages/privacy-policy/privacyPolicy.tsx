"use client";

import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';

const PrivacyPolicy = () => {
    const routes = all_routes
    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Privcy Policy',
            active: false,
            link: routes.home1
        },
        {
            label: 'Pages',
            active: false,
        },
        {
            label: 'Privcy Policy',
            active: true,
        },
    ];

    return (
        <div>
            <Breadcrumb title="Privcy Policy" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-02" />

            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    {/* Privacy Policy */}
                    <p>
                        At Travel DreamsTour, your privacy is important to us. This Privacy
                        Policy outlines how we collect, use, disclose, and protect your personal
                        information when you use our website and services.
                    </p>
                    {/* Policy 1 */}
                    <h6 className="mb-2">1. Information We Collect</h6>
                    <div className="mb-4">
                        <div className="d-flex mb-1">
                            <span className="me-2">
                                <i className="ti ti-square-rotated-filled text-primary" />
                            </span>
                            <p>
                                Personal Information: We collect personal information that you
                                provide to us, such as your name, email address, phone number,
                                mailing address, payment information, and travel preferences.
                            </p>
                        </div>
                        <div className="d-flex">
                            <span className="me-2">
                                <i className="ti ti-square-rotated-filled text-primary" />
                            </span>
                            <p>
                                Non-Personal Information: We also collect non-personal information
                                automatically, such as your IP address, browser type, device
                                information, and usage patterns through cookies and analytics tools.
                            </p>
                        </div>
                    </div>
                    {/* /Policy 1 */}
                    {/* Policy 2 */}
                    <h6 className="mb-2">2. How We Use Your Information</h6>
                    <div className="mb-4">
                        <p className="mb-1">
                            <i className="ti ti-square-rotated-filled text-primary me-2" /> To
                            process your bookings and payments.
                        </p>
                        <p className="mb-1">
                            <i className="ti ti-square-rotated-filled text-primary me-2" /> To
                            communicate with you regarding your reservations and inquiries.
                        </p>
                        <p className="mb-1">
                            <i className="ti ti-square-rotated-filled text-primary me-2" /> To
                            personalize your experience and provide customer support.
                        </p>
                        <p className="mb-1">
                            <i className="ti ti-square-rotated-filled text-primary me-2" /> To
                            send promotional materials, newsletters, and special offers (you can
                            opt out at any time).
                        </p>
                        <p>
                            <i className="ti ti-square-rotated-filled text-primary me-2" /> To
                            analyze usage trends and improve our services.
                        </p>
                    </div>
                    {/* /Policy 2 */}
                    {/* Policy 3 */}
                    <h6 className="mb-2">3. Sharing Your Information</h6>
                    <p className="mb-1">We may share your information with:</p>
                    <div className="mb-4">
                        <p className="mb-1">
                            <i className="ti ti-square-rotated-filled text-primary me-2" />{" "}
                            Service Providers: Third-party partners, such as airlines, hotels, and
                            car rental companies, to fulfill your bookings.
                        </p>
                        <p className="mb-1">
                            <i className="ti ti-square-rotated-filled text-primary me-2" />{" "}
                            Business Transfers: In the event of a merger, acquisition, or sale of
                            all or a portion of our assets, your information may be transferred.
                        </p>
                        <p>
                            <i className="ti ti-square-rotated-filled text-primary me-2" /> Legal
                            Compliance: When required by law or to protect our rights or the
                            rights of others.
                        </p>
                    </div>
                    {/* /Policy 3 */}
                    {/* Policy 4 */}
                    <h6 className="mb-2">4. Data Security</h6>
                    <p className="mb-4">
                        We take appropriate measures to protect your personal information from
                        unauthorized access, use, or disclosure. This includes using encryption,
                        secure servers, and firewalls.
                    </p>
                    {/* /Policy 4 */}
                    {/* Policy 5 */}
                    <h6 className="mb-2">5. Your Rights</h6>
                    <p className="mb-1">You have the right to:</p>
                    <div>
                        <p className="mb-1">
                            <i className="ti ti-square-rotated-filled text-primary me-2" /> Access
                            the personal information we hold about you.
                        </p>
                        <p className="mb-1">
                            <i className="ti ti-square-rotated-filled text-primary me-2" />{" "}
                            Request corrections to your personal information.
                        </p>
                        <p className="mb-1">
                            <i className="ti ti-square-rotated-filled text-primary me-2" />{" "}
                            Request the deletion of your personal information, subject to legal
                            obligations.
                        </p>
                        <p>
                            <i className="ti ti-square-rotated-filled text-primary me-2" />{" "}
                            Opt-out of marketing communications at any time.
                        </p>
                    </div>
                    {/* /Policy 5 */}
                    {/* /Privacy Policy */}
                </div>
            </div>
            {/* /Page Wrapper */}


        </div>
    )
}

export default PrivacyPolicy
