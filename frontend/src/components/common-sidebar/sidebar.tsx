"use client";
import { useEffect, useState } from 'react'
import ImageWithBasePath from '../image-with-base-path'
import { all_routes } from '../../routes/all_routes'
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {

    const routes = all_routes
    const location = { pathname: usePathname() ?? "" };
    const [subdroptoggle, setsubdroptoggle] = useState<boolean[]>([false, false]);

    const handleToggle = (index: number) => {
        setsubdroptoggle((prev) =>
            prev.map((_, i) => (i === index ? !prev[i] : false))
        );
    };
    useEffect(() => {
        if (location.pathname.includes("booking") || location.pathname.includes("customer-cancellation-refunds")) {
            setsubdroptoggle([true, false]);
        }
        else if (location.pathname.includes("customer-coupons") || location.pathname.includes("customer-loyalty-points") ||
            location.pathname.includes("customer-reward-history") || location.pathname.includes("customer-gift-cards"
            ) || location.pathname.includes("customer-referral-program")) {
            setsubdroptoggle([false, true]);
        }
    }, [location.pathname]);

    return (
        <div>
            {/* Sidebar */}
            <div className="card user-sidebar mb-4 mb-lg-0 theiaStickySidebar">
                <div className="stickysidebar">
                    <div className="card-header user-sidebar-header">
                        <div className="profile-content rounded-pill">
                            <div className="d-flex align-items-center justify-content-between ">
                                <div className=" d-flex align-items-center justify-content-center ">
                                    <ImageWithBasePath
                                        src="assets/img/users/user-01.jpg"
                                        alt="image"
                                        className="img-fluid avatar avatar-lg rounded-circle flex-shrink-0 me-1"
                                    />
                                    <div>
                                        <h6 className="fs-16">Jeffrey Wilson</h6>
                                        <span className="fs-14 text-gray-6">Since 10 May 2025</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <Link
                                            href={routes.profileSettings}
                                            className="p-1 rounded-circle btn btn-light d-flex align-items-center justify-content-center"
                                        >
                                            <i className="isax isax-edit-2 fs-14" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body user-sidebar-body">
                        <ul>
                            <li>
                                <span className="fs-14 text-gray-3 fw-medium mb-2">Main</span>
                            </li>
                            <li>
                                <Link
                                    href={routes.userDashboard}
                                    className={`d-flex align-items-center ${location.pathname === routes.userDashboard && 'active'}`}
                                >
                                    <i className="isax isax-grid-55" />
                                    Dashboard
                                </Link>
                            </li>
                            <li className="submenu">
                                <Link href="#" onClick={(e) => {
                                    e.preventDefault();
                                    handleToggle(0);
                                }}
                                    className={`d-block ${subdroptoggle[0] ? "subdrop" : ""} ${location.pathname.includes('booking') || location.pathname.includes('customer-cancellation-refunds') ? 'active' : ''}`}>
                                    <i className="isax isax-calendar-tick5" />
                                    <span>My Bookings</span>
                                    <span className="menu-arrow" />
                                </Link>
                                <ul className={` ${subdroptoggle[0] ? 'd-block' : 'd-none'}`}>
                                    <li>
                                        <Link
                                            href={routes.userAllBookings}
                                            className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes('customer-all-bookings') ? 'active' : ''}`}
                                        >
                                            All Bookings
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={routes.userFlightBooking}
                                            className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes('customer-flight-booking') ? 'active' : ''}`}
                                        >
                                            Flights
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={routes.userHotlesBooking}
                                            className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes('customer-hotel-booking') ? 'active' : ''}`}
                                        >
                                            Hotels
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={routes.userCarBooking}
                                            className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes('customer-car-booking') ? 'active' : ''}`}
                                        >
                                            Cars
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={routes.userCruiseBooking}
                                            className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes('customer-cruise-booking') ? 'active' : ''}`}
                                        >
                                            Cruise
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={routes.userTourBooking}
                                            className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes('customer-tour-booking') ? 'active' : ''}`}
                                        >
                                            Tour
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={routes.userTourGuideBooking}
                                            className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes('customer-tour-guides-booking') ? 'active' : ''}`}
                                        >
                                            Tour Guides
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={routes.userBusBooking}
                                            className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes('customer-bus-booking') ? 'active' : ''}`}
                                        >
                                            Bus
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={routes.userVisaBooking}
                                            className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes('customer-visa-booking') ? 'active' : ''}`}
                                        >
                                            Visa
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={routes.userActivitiesBooking}
                                            className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes('customer-activities-booking') ? 'active' : ''}`}
                                        >
                                            Activities
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={routes.customerCancellationRefunds}
                                            className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes('customer-cancellation-refunds') ? 'active' : ''}`}
                                        >
                                            Cancellations &amp; Refunds
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link href={routes.userReviews} className={`d-flex align-items-center ${location.pathname.includes('review') ? 'active' : ''}`}>
                                    <i className="isax isax-magic-star5" /> My Reviews
                                </Link>
                            </li>
                            <li>
                                <div className="message-content">
                                    <Link href={routes.userChat} className={`d-flex align-items-center ${location.pathname.includes('chat') ? 'active' : ''}`}>
                                        <i className="isax isax-message-square5" /> Messages
                                    </Link>
                                    <span className="msg-count rounded-circle">02</span>
                                </div>
                            </li>
                            <li className="mb-2">
                                <Link href={routes.wishlist} className={`d-flex align-items-center ${location.pathname.includes('wishlist') ? 'active' : ''}`}>
                                    <i className="isax isax-heart5" /> Wishlist
                                </Link>
                            </li>
                            <li className="submenu">
                                <Link href="#" onClick={(e) => {
                                    e.preventDefault();
                                    handleToggle(1);
                                }}
                                    className={`d-block ${subdroptoggle[1] ? 'subdrop' : ''} ${location.pathname === '/user/customer-coupons' ||
                                        location.pathname === '/user/customer-loyalty-points' || location.pathname === '/user/customer-reward-history' || location.pathname === '/user/customer-gift-cards' || location.pathname === '/user/customer-referral-program' ? 'active' : ''}`}>
                                    <i className="isax isax-discount-shape5" />
                                    <span>Offers & Rewards</span>
                                    <span className="menu-arrow" />
                                </Link>
                                <ul className={` ${subdroptoggle[1] ? 'd-block' : 'd-none'}`}>
                                    <li>
                                        <Link
                                            href={routes.userCoupons}
                                            className={`fs-14 d-inline-flex align-items-center ${location.pathname === '/user/customer-coupons' ? 'active' : ''}`}
                                        >
                                            Coupons
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={routes.userLoyaltyPoints}
                                            className={`fs-14 d-inline-flex align-items-center ${location.pathname === '/user/customer-loyalty-points' ? 'active' : ''}`}
                                        >
                                            Loyalty Points
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={routes.userRewardHistory}
                                            className={`fs-14 d-inline-flex align-items-center ${location.pathname === '/user/customer-reward-history' ? 'active' : ''}`}
                                        >
                                            Rewards History
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={routes.userReferralProgram}
                                            className={`fs-14 d-inline-flex align-items-center ${location.pathname === '/user/customer-referral-program' ? 'active' : ''}`}
                                        >
                                            Referral Program
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={routes.userGiftCards}
                                            className={`fs-14 d-inline-flex align-items-center ${location.pathname === '/user/customer-gift-cards' ? 'active' : ''}`}
                                        >
                                            Gift Cards
                                        </Link>
                                    </li>

                                </ul>
                            </li>
                            <li>
                                <span className="fs-14 text-gray-3 fw-medium mb-2">Finance</span>
                            </li>
                            <li>
                                <Link href={routes.userWallet} className={`d-flex align-items-center ${location.pathname.includes('wallet') ? 'active' : ''}`}>
                                    <i className="isax isax-wallet-add-15" /> Wallet
                                </Link>
                            </li>
                            <li>
                                <Link href={routes.payment} className={`d-flex align-items-center ${location.pathname.includes('payment') ? 'active' : ''}`}>
                                    <i className="isax isax-money-recive5" /> Payments
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href={routes.customerInvoices} className={`d-flex align-items-center ${location.pathname.includes('customer-invoices') ? 'active' : ''}`}>
                                    <i className="isax isax-receipt-item5" /> Invoices
                                </Link>
                            </li>
                            <li>
                                <span className="fs-14 text-gray-3 fw-medium mb-2">Account</span>
                            </li>
                            <li>
                                <Link href={routes.myProfile} className={`d-flex align-items-center ${location.pathname.includes('my-profile') ? 'active' : ''}`}>
                                    <i className="isax isax-profile-tick5" /> My Profile
                                </Link>
                            </li>
                            <li>
                                <div className="message-content">
                                    <Link
                                        href={routes.notification}
                                        className={`d-flex align-items-center ${location.pathname.includes('notifications') ? 'active' : ''}`}
                                    >
                                        <i className="isax isax-notification-bing5" /> Notifications
                                    </Link>
                                    <span className="msg-count bg-purple rounded-circle">05</span>
                                </div>
                            </li>
                            <li>
                                <Link
                                    href={routes.profileSettings}
                                    className={`d-flex align-items-center ${location.pathname.includes('settings') ? 'active' : ''}`}
                                >
                                    <i className="isax isax-setting-25" /> Settings
                                </Link>
                            </li>
                            <li>
                                <Link href={routes.allService1} className="d-flex align-items-center pb-0">
                                    <i className="isax isax-logout-15" /> Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* /Sidebar */}

        </div>
    )
}

export default Sidebar
