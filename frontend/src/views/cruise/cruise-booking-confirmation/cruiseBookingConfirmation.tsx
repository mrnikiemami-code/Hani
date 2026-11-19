"use client";


import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import ImageWithBasePath from '../../../components/image-with-base-path';
import Link from "next/link";
import { AgencyName } from "@/features/agencies/ui/AgencyName";

const CruiseBookingConfirmation = () => {
	const routes = all_routes
	//Breadcrumb Data
	const breadcrumbs = [
		{
			label: 'Cruise',
			link: routes.allService1,
			active: false,
		},
		{
			label: 'Cruise',
			active: true,
		},
		{
			label: 'Cruise Booking Confirmation',
			active: true,
		},
	];
	return (
		<>
			<Breadcrumb
				title="Cruise"
				breadcrumbs={breadcrumbs}
				backgroundClass="breadcrumb-bg-06"
			/>
			<div className="content">
				<div className="container">

					{/* Booking Confirmation */}
					<div className="row justify-content-center">
						<div className="col-lg-10">
							<div className="card booking-confirmation mb-0">
								<div className="card-body">
									<div className="bg-light-200 border border-light p-3 rounded-2 mb-4">
										<div className="d-flex flex-wrap align-items-center justify-content-between ">
											<div className="d-flex flex-wrap align-items-center booking-hotels">
												<Link href={routes.cruiseDetails} className="avatar avatar-lg me-2">
													<ImageWithBasePath src="assets/img/cruise/cruise-15.jpg" alt="image" className="img-fluid  rounded-circle" />
												</Link>
												<div className="booking-details">
													<h6 className="mb-1"><Link href={routes.cruiseDetails}>Azure Coast Cruises</Link></h6>
													<div className="d-flex flex-wrap align-items-center booking-items">
														<p className="fs-14 text-gray-6 pe-2 border-end border-light d-flex align-items-center me-2 ">
															<i className="isax isax-ship me-2"></i>Luxury Cruise
														</p>
														<p className="fs-14 text-gray-6 pe-2 border-end border-light d-flex align-items-center me-2 ">
															<i className="isax isax-location5 me-1"></i>15/C Prince Dareen Road, New
															York
														</p>
														<p className="fs-14 text-gray-6 pe-2 border-end border-light d-flex align-items-center me-2 ">
															<span className="badge badge-warning text-gray-9 me-1">5.0</span>(400
															Reviews)
														</p>
													</div>
												</div>
											</div>
											<div>
												<span className="badge badge-info status rounded-pill p-2 fs-10 d-flex align-items-center">Upcoming</span>
											</div>
										</div>
									</div>
									<div className="pb-4 border-bottom mb-4">
										<h6 className="mb-2">Cabin Details</h6>
										<div className="row g-3">
											<div className="col-lg-3">
												<h6 className="fs-14">Cabin Type</h6>
												<p className="text-gray-6 fs-16 ">Balcony &middot; 8012</p>
											</div>
											<div className="col-lg-3">
												<h6 className="fs-14">Deck</h6>
												<p className="text-gray-6 fs-16 ">8 &middot; Marina, midship</p>
											</div>
											<div className="col-lg-3">
												<h6 className="fs-14">Fare per guest</h6>
												<p className="text-gray-6 fs-16 ">$960</p>
											</div>
											<div className="col-lg-3">
												<h6 className="fs-14">Guests</h6>
												<p className="text-gray-6 fs-16 ">2 adults</p>
											</div>
										</div>
									</div>
									<div className="pb-4 border-bottom mb-4">
										<h6 className="mb-2">Booking Info</h6>
										<div className="row g-3">
											<div className="col-lg-3">
												<h6 className="fs-14">Embarkation port</h6>
												<p className="text-gray-6 fs-16 ">Barcelona, Spain</p>
											</div>
											<div className="col-lg-3">
												<h6 className="fs-14">Disembarkation port</h6>
												<p className="text-gray-6 fs-16 ">Barcelona, Spain</p>
											</div>
											<div className="col-lg-3">
												<h6 className="fs-14">Duration</h6>
												<p className="text-gray-6 fs-16 ">6 nights, 4 ports</p>
											</div>
											<div className="col-lg-3">
												<h6 className="fs-14">Sails</h6>
												<p className="text-gray-6 fs-16 ">15 May 2025, 18:00</p>
											</div>
											<div className="col-lg-3">
												<h6 className="fs-14">Returns</h6>
												<p className="text-gray-6 fs-16 ">21 May 2025, 07:00</p>
											</div>
											<div className="col-lg-3">
												<h6 className="fs-14">Booked on</h6>
												<p className="text-gray-6 fs-16 ">02 Nov 2024</p>
											</div>
										</div>
									</div>
									<div className="pb-4 border-bottom mb-4">
										<h6 className="mb-2">Extra Service Info</h6>
										<div className="d-flex flex-wrap align-items-center service-info gap-3">
											<span className="badge badge-light rounded-pill">Custom Service</span>
											<span className="badge badge-light rounded-pill">Pickup & Drop</span>
											<span className="badge badge-light rounded-pill">Breakfast</span>
										</div>
									</div>
									<div className="pb-4 border-bottom mb-4">
										<h6 className="mb-2">Billing Info</h6>
										<div className="row g-3">
											<div className="col-lg-3">
												<h6 className="fs-14 mb-1">Name</h6>
												<p className="fs-16 text-gray-6"><AgencyName /></p>
											</div>
											<div className="col-lg-3">
												<h6 className="fs-14 mb-1">Email</h6>
												<p className="fs-16 text-gray-6">chrfo2356@example.com</p>
											</div>
											<div className="col-lg-3">
												<h6 className="fs-14 mb-1">Phone</h6>
												<p className="fs-16 text-gray-6">+1 12656 26654</p>
											</div>
											<div className="col-lg-3">
												<h6 className="fs-14 mb-1">Address</h6>
												<p className="fs-16 text-gray-6">15/C Prince Road, New York</p>
											</div>
										</div>
									</div>
									<div>
										<div className="alert alert-warning d-flex align-items-start gap-2 mb-4">
											<i className="isax isax-calendar-1 flex-shrink-0 mt-1"></i>
											<div>
												<p className="fs-14 fw-medium text-dark mb-1">Balance of $1,778 due by 14 Feb 2025</p>
												<p className="fs-13 text-gray-6 mb-2">Booking total $2,278. Deposit of $500 received. We will email a reminder 14 days before the due date, and you can pay any time from Manage Booking.</p>
												<Link href={routes.manageBooking} className="btn btn-primary btn-sm">Pay balance</Link>
											</div>
										</div>
										<h6 className="mb-2">Order Info</h6>
										<div className="row g-3">
											<div className="col-lg-3">
												<h6 className="fs-14 mb-1">Order Id</h6>
												<p className="fs-16 text-primary">#45669</p>
											</div>
											<div className="col-lg-3">
												<h6 className="fs-14 mb-1">Payment Method</h6>
												<p className="fs-16 text-gray-6">Credit Card (Visa)</p>
											</div>
											<div className="col-lg-3">
												<h6 className="fs-14 mb-1">Payment Status</h6>
												<p className="fs-16 text-success">Deposit paid</p>
											</div>
											<div className="col-lg-3">
												<h6 className="fs-14 mb-1">Date of Payment</h6>
												<p className="fs-16 text-gray-6">02 Nov 2024, 14:22</p>
											</div>
											<div className="col-lg-3">
												<h6 className="fs-14 mb-1">Port charges &amp; taxes</h6>
												<p className="fs-16 text-gray-6">$148</p>
											</div>
											<div className="col-lg-3">
												<h6 className="fs-14 mb-1">Discount</h6>
												<p className="fs-16 text-gray-6">20% ($15)</p>
											</div>
											<div className="col-lg-3">
												<h6 className="fs-14 mb-1">Booking Fees</h6>
												<p className="fs-16 text-gray-6">$25</p>
											</div>
											<div className="col-lg-3">
												<h6 className="fs-14 mb-1">Total Paid</h6>
												<p className="fs-16 text-gray-6">$6569</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* / Booking Confirmation */}

				</div>
			</div>
		</>
	)
}

export default CruiseBookingConfirmation