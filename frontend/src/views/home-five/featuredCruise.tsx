"use client";
import  { useState } from 'react'
import ImageWithBasePath from '../../components/image-with-base-path'
import Link from "next/link";
import CountUp from 'react-countup'
import AppSwiper from '../../components/app-swiper'
import { all_routes } from '../../routes/all_routes';

const FeaturedCruise = () => {

    const routes = all_routes;

      


     const [selectedItems, setSelectedItems] = useState(Array(10).fill(false));
        const handleItemClick = (index: number) => {
            setSelectedItems((prevSelectedItems) => {
                const updatedSelectedItems = [...prevSelectedItems];
                updatedSelectedItems[index] = !updatedSelectedItems[index];
                return updatedSelectedItems;
            });
        };

  return (
   
    <>
       {/* Cruise Section */}
    <section className="section place-section  bgwhite">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-5 col-lg-10 text-center aos" data-aos="fade-up">
                    <div className="section-header text-center">
                        <h2 className="mb-2">Featured <span className="text-primary  text-decoration-underline">Cruises</span></h2>
                        <p className="sub-title">Discover our handpicked selection of top-rated cruises, offering exceptional experiences and unbeatable deals.</p>
                    </div>
                </div>
            </div>
            {/* Cruise List */}
            <div className="owl-carousel place-slider nav-center  aos"data-aos="fade-up">
            <AppSwiper preset="place-slider">
                {/* Place Item*/}
                <div className="place-item border mb-4">
                    <div className="place-img">
                        
                        <AppSwiper preset="img-slider">
                            <div className="slide-images">
                                <Link href={routes.cruiseDetails}>
                                    <ImageWithBasePath src="assets/img/cruise/cruise-01.jpg" className="img-fluid" alt="img" />
                                </Link>
                            </div>
                            <div className="slide-images">
                                <Link href={routes.cruiseDetails}>
                                    <ImageWithBasePath src="assets/img/cruise/cruise-02.jpg" className="img-fluid" alt="img" />
                                </Link>
                            </div>
                            </AppSwiper>
                        <div className="fav-item" key={1}  onClick={() => handleItemClick(1)}>
                            <Link href="#" className={`fav-icon ${selectedItems[1] ?'selected':''}`}>
                                <i className="isax isax-heart5"></i>
                            </Link>
                            <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                        </div>
                    </div>
                    <div className="place-content">
                        <div className="d-flex align-items-center mb-2">
                            <Link href="#" className="d-flex align-items-center me-2">
                                <span className="avatar avatar-xs me-2">
									<ImageWithBasePath src="assets/img/users/user-01.jpg" className="rounded-circle" alt="img" />
								</span>
                                <p className="fs-14">Beth Williams</p>
                            </Link>
                            <div className="d-flex align-items-center ps-2 border-start">
                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">5.0</span>
                                <p className="fs-14">(400 Reviews)</p>
                            </div>
                        </div>

                        <h5 className="mb-1"><Link href={routes.cruiseDetails}>Super Aquamarine</Link></h5>
                        <p className="d-flex align-items-center mb-3"><i className="isax isax-location5 me-2"></i>Ciutat Vella, Barcelona</p>
                        <div className="guest-details">
                            <ul>
                                <li>
                                    <h6><i className="isax isax-calendar-2 me-2"></i><span>Year</span> : 2021</h6>
                                </li>
                                <li>
                                    <h6><i className="isax isax-fatrows me-2"></i><span>Width</span> : 88.47 m</h6>
                                </li>
                                <li>
                                    <h6><i className="isax isax-user me-2"></i><span>Guests </span> : 4</h6>
                                </li>
                                <li>
                                    <h6><i className="isax isax-flash me-2"></i><span>Speed </span> : 19 Knots</h6>
                                </li>
                            </ul>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <h6 className="d-flex align-items-center">
								<i className="isax isax-wifi me-2"></i>
								<i className="isax isax-scissor me-2 "></i>
								<i className="isax isax-profile-2user me-2 "></i>
								<i className="isax isax-wind-2 me-2 "></i>
								<Link href="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link>
							</h6>
                            <h5 className="text-primary">$500 <span className="fs-14 fw-normal text-default">/ day</span></h5>
                        </div>
                    </div>
                </div>
                {/* /Place Item*/}

                {/* Place Item*/}
                <div className="place-item border mb-4">
                    <div className="place-img">
                        
                        <AppSwiper preset="img-slider">
                            <div className="slide-images">
                                <Link href={routes.cruiseDetails}>
                                    <ImageWithBasePath src="assets/img/cruise/cruise-02.jpg" className="img-fluid" alt="img" />
                                </Link>
                            </div>
                            <div className="slide-images">
                                <Link href={routes.cruiseDetails}>
                                    <ImageWithBasePath src="assets/img/cruise/cruise-03.jpg" className="img-fluid" alt="img" />
                                </Link>
                            </div>
                            </AppSwiper>
                        <div className="fav-item" key={2}  onClick={() => handleItemClick(2)}>
                            <Link href="#" className={`fav-icon ${selectedItems[2] ?'selected':''}`}>
                                <i className="isax isax-heart5"></i>
                            </Link>
                            <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                        </div>
                    </div>
                    <div className="place-content">
                        <div className="d-flex align-items-center mb-2">
                            <Link href="#" className="d-flex align-items-center me-2">
                                <span className="avatar avatar-xs me-2">
									<ImageWithBasePath src="assets/img/users/user-02.jpg" className="rounded-circle" alt="img" />
								</span>
                                <p className="fs-14">Brent Holmes</p>
                            </Link>
                            <div className="d-flex align-items-center ps-2 border-start">
                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.6</span>
                                <p className="fs-14">(520 Reviews)</p>
                            </div>
                        </div>

                        <h5 className="mb-1"><Link href={routes.cruiseDetails}>Sunny Sailor</Link></h5>
                        <p className="d-flex align-items-center mb-3"><i className="isax isax-location5 me-2"></i>Broad Street, Bristol</p>
                        <div className="guest-details">
                            <ul>
                                <li>
                                    <h6><i className="isax isax-calendar-2 me-2"></i><span>Year</span> : 2008</h6>
                                </li>
                                <li>
                                    <h6><i className="isax isax-fatrows me-2"></i><span>Width</span> : 64.37 m</h6>
                                </li>
                                <li>
                                    <h6><i className="isax isax-user me-2"></i><span>Guests </span> : 4</h6>
                                </li>
                                <li>
                                    <h6><i className="isax isax-flash me-2"></i><span>Speed </span> : 18 Knots</h6>
                                </li>
                            </ul>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <h6 className="d-flex align-items-center">
								<i className="isax isax-wifi me-2"></i>
								<i className="isax isax-scissor me-2 "></i>
								<i className="isax isax-profile-2user me-2 "></i>
								<i className="isax isax-wind-2 me-2 "></i>
								<Link href="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link>
							</h6>
                            <h5 className="text-primary">$350 <span className="fs-14 fw-normal text-default">/ day</span></h5>
                        </div>
                    </div>
                </div>
                {/* /Place Item*/}

                {/* Place Item*/}
                <div className="place-item border mb-4">
                    <div className="place-img">
                        
                        <AppSwiper preset="img-slider">
                            <div className="slide-images">
                                <Link href={routes.cruiseDetails}>
                                    <ImageWithBasePath src="assets/img/cruise/cruise-03.jpg" className="img-fluid" alt="img" />
                                </Link>
                            </div>
                            <div className="slide-images">
                                <Link href={routes.cruiseDetails}>
                                    <ImageWithBasePath src="assets/img/cruise/cruise-04.jpg" className="img-fluid" alt="img" />
                                </Link>
                            </div>
                            </AppSwiper>
                        <div className="fav-item" key={3}  onClick={() => handleItemClick(3)}>
                            <Link href="#" className={`fav-icon ${selectedItems[3] ?'selected':''}`}>
                                <i className="isax isax-heart5"></i>
                            </Link>
                            <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                        </div>
                    </div>
                    <div className="place-content">
                        <div className="d-flex align-items-center mb-2">
                            <Link href="#" className="d-flex align-items-center me-2">
                                <span className="avatar avatar-xs me-2">
									<ImageWithBasePath src="assets/img/users/user-03.jpg" className="rounded-circle" alt="img" />
								</span>
                                <p className="fs-14">John James</p>
                            </Link>
                            <div className="d-flex align-items-center ps-2 border-start">
                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.6</span>
                                <p className="fs-14">(360 Reviews)</p>
                            </div>
                        </div>

                        <h5 className="mb-1"><Link href={routes.cruiseDetails}>Ocean Voyager</Link></h5>
                        <p className="d-flex align-items-center mb-3"><i className="isax isax-location5 me-2"></i>Chapel Street, Salford</p>
                        <div className="guest-details">
                            <ul>
                                <li>
                                    <h6><i className="isax isax-calendar-2 me-2"></i><span>Year</span> : 2022</h6>
                                </li>
                                <li>
                                    <h6><i className="isax isax-fatrows me-2"></i><span>Width</span> : 98.56 m</h6>
                                </li>
                                <li>
                                    <h6><i className="isax isax-user me-2"></i><span>Guests </span> : 7</h6>
                                </li>
                                <li>
                                    <h6><i className="isax isax-flash me-2"></i><span>Speed </span> : 15 Knots</h6>
                                </li>
                            </ul>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <h6 className="d-flex align-items-center">
								<i className="isax isax-wifi me-2"></i>
								<i className="isax isax-scissor me-2 "></i>
								<i className="isax isax-profile-2user me-2 "></i>
								<i className="isax isax-wind-2 me-2 "></i>
								<Link href="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link>
							</h6>
                            <h5 className="text-primary">$700 <span className="fs-14 fw-normal text-default">/ day</span></h5>
                        </div>
                    </div>
                </div>
                {/* /Place Item*/}

                {/* Place Item*/}
                <div className="place-item border mb-4">
                    <div className="place-img">
                        
                        <AppSwiper preset="img-slider">
                            <div className="slide-images">
                                <Link href={routes.cruiseDetails}>
                                    <ImageWithBasePath src="assets/img/cruise/cruise-04.jpg" className="img-fluid" alt="img" />
                                </Link>
                            </div>
                            <div className="slide-images">
                                <Link href={routes.cruiseDetails}>
                                    <ImageWithBasePath src="assets/img/cruise/cruise-01.jpg" className="img-fluid" alt="img" />
                                </Link>
                            </div>
                            </AppSwiper>
                        <div className="fav-item" key={4}  onClick={() => handleItemClick(4)}>
                            <Link href="#" className={`fav-icon ${selectedItems[4] ?'selected':''}`}>
                                <i className="isax isax-heart5"></i>
                            </Link>
                            <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                        </div>
                    </div>
                    <div className="place-content">
                        <div className="d-flex align-items-center mb-2">
                            <Link href="#" className="d-flex align-items-center me-2">
                                <span className="avatar avatar-xs me-2">
									<ImageWithBasePath src="assets/img/users/user-04.jpg" className="rounded-circle" alt="img" />
								</span>
                                <p className="fs-14">Timothy</p>
                            </Link>
                            <div className="d-flex align-items-center ps-2 border-start">
                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.1</span>
                                <p className="fs-14">(300 Reviews)</p>
                            </div>
                        </div>

                        <h5 className="mb-1"><Link href={routes.cruiseDetails}>Albert Yacht</Link></h5>
                        <p className="d-flex align-items-center mb-3"><i className="isax isax-location5 me-2"></i>King’s Road, Chelsea</p>
                        <div className="guest-details">
                            <ul>
                                <li>
                                    <h6><i className="isax isax-calendar-2 me-2"></i><span>Year</span> : 2018</h6>
                                </li>
                                <li>
                                    <h6><i className="isax isax-fatrows me-2"></i><span>Width</span> : 90.56 m</h6>
                                </li>
                                <li>
                                    <h6><i className="isax isax-user me-2"></i><span>Guests </span> : 3</h6>
                                </li>
                                <li>
                                    <h6><i className="isax isax-flash me-2"></i><span>Speed </span> : 25 Knots</h6>
                                </li>
                            </ul>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <h6 className="d-flex align-items-center">
								<i className="isax isax-wifi me-2"></i>
								<i className="isax isax-scissor me-2 "></i>
								<i className="isax isax-profile-2user me-2 "></i>
								<i className="isax isax-wind-2 me-2 "></i>
								<Link href="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link>
							</h6>
                            <h5 className="text-primary">$550 <span className="fs-14 fw-normal text-default">/ day</span></h5>
                        </div>
                    </div>
                </div>
                {/* /Place Item*/}

                {/* Place Item*/}
                <div className="place-item border mb-4">
                    <div className="place-img">
                        
                        <AppSwiper preset="img-slider">
                            <div className="slide-images">
                                <Link href={routes.cruiseDetails}>
                                    <ImageWithBasePath src="assets/img/cruise/cruise-01.jpg" className="img-fluid" alt="img" />
                                </Link>
                            </div>
                            <div className="slide-images">
                                <Link href={routes.cruiseDetails}>
                                    <ImageWithBasePath src="assets/img/cruise/cruise-02.jpg" className="img-fluid" alt="img" />
                                </Link>
                            </div>
                            </AppSwiper>
                        <div className="fav-item"  key={5}  onClick={() => handleItemClick(5)}>
                            <Link href="#" className={`fav-icon ${selectedItems[5] ?'selected':''}`}>
                                <i className="isax isax-heart5"></i>
                            </Link>
                            <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                        </div>
                    </div>
                    <div className="place-content">
                        <div className="d-flex align-items-center mb-2">
                            <Link href="#" className="d-flex align-items-center me-2">
                                <span className="avatar avatar-xs me-2">
									<ImageWithBasePath src="assets/img/users/user-01.jpg" className="rounded-circle" alt="img" />
								</span>
                                <p className="fs-14">Beth Williams</p>
                            </Link>
                            <div className="d-flex align-items-center ps-2 border-start">
                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">5.0</span>
                                <p className="fs-14">(400 Reviews)</p>
                            </div>
                        </div>

                        <h5 className="mb-1"><Link href={routes.cruiseDetails}>Super Aquamarine</Link></h5>
                        <p className="d-flex align-items-center mb-3"><i className="isax isax-location5 me-2"></i>Ciutat Vella, Barcelona</p>
                        <div className="guest-details">
                            <ul>
                                <li>
                                    <h6><i className="isax isax-calendar-2 me-2"></i><span>Year</span> : 2021</h6>
                                </li>
                                <li>
                                    <h6><i className="isax isax-fatrows me-2"></i><span>Width</span> : 88.47 m</h6>
                                </li>
                                <li>
                                    <h6><i className="isax isax-user me-2"></i><span>Guests </span> : 4</h6>
                                </li>
                                <li>
                                    <h6><i className="isax isax-flash me-2"></i><span>Speed </span> : 19 Knots</h6>
                                </li>
                            </ul>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <h6 className="d-flex align-items-center">
								<i className="isax isax-wifi me-2"></i>
								<i className="isax isax-scissor me-2 "></i>
								<i className="isax isax-profile-2user me-2 "></i>
								<i className="isax isax-wind-2 me-2 "></i>
								<Link href="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link>
							</h6>
                            <h5 className="text-primary">$500 <span className="fs-14 fw-normal text-default">/ day</span></h5>
                        </div>
                    </div>
                </div>
                {/* /Place Item*/}
                </AppSwiper>
            </div>
            {/* /Cruise List */}

            <div className="text-center view-all aos" data-aos="fade-up">
                <Link href={routes.cruiseList} className="btn btn-primary">View All<i className="isax isax-arrow-right-3 ms-2"></i></Link>
            </div>
        </div>
    </section>
    {/* /Cruise Section */}

    {/* Counter Section */}
    <section className="section pt-0">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="rating-feedback  aos" data-aos="fade-up">
                        <div className="bg-div">
                            <ImageWithBasePath src="assets/img/bg/bg-02.png" className="bg-2" alt="img" />
                        </div>
                        <ul>
                            <li>
                                <h6><i className="isax isax-global me-2"></i>Destinations Worldwide</h6>
                                <h4><span className="counter"><CountUp end={50} /></span>+</h4>
                            </li>
                            <li>
                                <h6><i className="isax isax-calendar-2  me-2"></i>Booking Completed</h6>
                                <h4><span className="counter"><CountUp end={7000} /></span> +</h4>
                            </li>
                            <li>
                                <h6><i className="isax isax-tag-user me-2"></i>Client Globally</h6>
                                <h4><span className="counter"><CountUp end={100} /></span> +</h4>
                            </li>
                            <li>
                                <h6><i className="isax isax-status-up me-2"></i>Providers Registered</h6>
                                <h4><span className="counter"><CountUp end={89} /></span> +</h4>
                            </li>
                        </ul>
                        <div className="bg-div">
                            <ImageWithBasePath src="assets/img/bg/bg-01.png" className="bg-1" alt="img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
     {/* /Counter Section */}
    </>
  )
}

export default FeaturedCruise