"use client";
import Link from "next/link";


const BusOffcanvas = () => {

  return (

    <>
        {/* start offcanvas */}
        <div
            className="offcanvas offcanvas-offset offcanvas-end custom-offcanvas"
            tabIndex={-1}
            id="bus_details"
        >
            <div className="offcanvas-header d-block border-bottom">
            <div className="d-flex align-items-center justify-content-between">
                <h4 className="offcanvas-title fs-20 fw-bold">Details</h4>
                <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                >
                Close
                </button>
            </div>
            </div>
            <div className="offcanvas-body">
            <div className="filter-items">
                <div className="filter-body">
                <div>
                    <div className="offcanvas-date mb-3">
                    <p className="border">08:35 AM</p>
                    <span className="way-icon badge badge-dark rounded-pill translate-middle border-0">
                        <i className="fa-solid fa-arrow-right-arrow-left" />
                    </span>
                    <p className="border">4:55 PM</p>
                    </div>
                    <div className="offcanvas-item d-flex align-items-center justify-content-center mb-3 pb-3 border-bottom gap-3">
                    <p className="d-flex align-items-center mb-0 gap-1">
                        {" "}
                        <i className="isax isax-clock" /> 07h :15m
                    </p>
                    <i className="fa-solid fa-circle fs-7 text-dark" />
                    <p>Bharat Benz (Sleeper)</p>
                    </div>
                    {/* Tab Item */}
                    <ul className="nav" role="tablist">
                    <li>
                        <Link
                        href="#"
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#add_flight"
                        aria-selected="true"
                        role="tab"
                        >
                        Pick-up
                        </Link>
                    </li>
                    <li>
                        <Link
                        href="#"
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#add_cabin"
                        aria-selected="false"
                        role="tab"
                        tabIndex={-1}
                        >
                        Drop-Off
                        </Link>
                    </li>
                    </ul>
                    <div className="tab-content">
                    {/* Add New Flight */}
                    <div
                        className="tab-pane fade active show"
                        id="add_flight"
                        role="tabpanel"
                    >
                        <h6 className="mb-3 content-item">
                        Select pick-up points in New York (5)
                        </h6>
                        <div className="card">
                        <div className="card-body border-bottom">
                            <div className="item">
                            <h6>Times Square (Broadway &amp; 47th St.)</h6>
                            <p>8:45 AM</p>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-end">
                            <input
                                className="form-check-input mt-0"
                                type="radio"
                                name="Radio"
                                id="one"
                                defaultValue="one"
                                defaultChecked
                            />
                            <label
                                className="form-check-label fs-14 ms-2"
                                htmlFor="one"
                            />
                            </div>
                        </div>
                        <div className="card-body border-bottom">
                            <div className="item">
                            <h6>Port Authority Bus Terminal</h6>
                            <p>10:30 AM</p>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-end">
                            <input
                                className="form-check-input mt-0"
                                type="radio"
                                name="Radio"
                                id="two"
                                defaultValue="two"
                            />
                            <label
                                className="form-check-label fs-14 ms-2"
                                htmlFor="two"
                            />
                            </div>
                        </div>
                        <div className="card-body border-bottom">
                            <div className="item">
                            <h6>Central Park South (Columbus Circle)</h6>
                            <p>12:15 PM</p>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-end">
                            <input
                                className="form-check-input mt-0"
                                type="radio"
                                name="Radio"
                                id="three"
                                defaultValue="three"
                            />
                            <label
                                className="form-check-label fs-14 ms-2"
                                htmlFor="three"
                            />
                            </div>
                        </div>
                        <div className="card-body border-bottom">
                            <div className="item">
                            <h6>Penn Station (8th Ave &amp; 31st St.)</h6>
                            <p>2:00 PM</p>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-end">
                            <input
                                className="form-check-input mt-0"
                                type="radio"
                                name="Radio"
                                id="four"
                                defaultValue="four"
                            />
                            <label
                                className="form-check-label fs-14 ms-2"
                                htmlFor="four"
                            />
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="item">
                            <h6>Battery Park (State St. &amp; Battery Pl.)</h6>
                            <p>4:45 PM</p>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-end">
                            <input
                                className="form-check-input mt-0"
                                type="radio"
                                name="Radio"
                                id="five"
                                defaultValue="five"
                            />
                            <label
                                className="form-check-label fs-14 ms-2"
                                htmlFor="five"
                            />
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* Add New Cabin */}
                    <div className="tab-pane fade" id="add_cabin" role="tabpanel">
                        <h6 className="mb-3 content-item">
                        Select Drop-Off points in LasVegas (5)
                        </h6>
                        <div className="card">
                        <div className="card-body border-bottom">
                            <div className="item">
                            <h6>Bellagio Hotel &amp; Casino</h6>
                            <p>8:45 AM</p>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-end">
                            <input
                                className="form-check-input mt-0"
                                type="radio"
                                name="Radio"
                                id="six"
                                defaultValue="six"
                            />
                            <label
                                className="form-check-label fs-14 ms-2"
                                htmlFor="six"
                            />
                            </div>
                        </div>
                        <div className="card-body border-bottom">
                            <div className="item">
                            <h6>Fremont Street Experience</h6>
                            <p>10:30 AM</p>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-end">
                            <input
                                className="form-check-input mt-0"
                                type="radio"
                                name="Radio"
                                id="seven"
                                defaultValue="seven"
                            />
                            <label
                                className="form-check-label fs-14 ms-2"
                                htmlFor="seven"
                            />
                            </div>
                        </div>
                        <div className="card-body border-bottom">
                            <div className="item">
                            <h6>LINQ Promenade</h6>
                            <p>12:15 PM</p>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-end">
                            <input
                                className="form-check-input mt-0"
                                type="radio"
                                name="Radio"
                                id="eight"
                                defaultValue="eight"
                            />
                            <label
                                className="form-check-label fs-14 ms-2"
                                htmlFor="eight"
                            />
                            </div>
                        </div>
                        <div className="card-body border-bottom">
                            <div className="item">
                            <h6>MGM Hotel &amp; Casino (South Strip)</h6>
                            <p>2:00 PM</p>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-end">
                            <input
                                className="form-check-input mt-0"
                                type="radio"
                                name="Radio"
                                id="none"
                                defaultValue="none"
                            />
                            <label
                                className="form-check-label fs-14 ms-2"
                                htmlFor="none"
                            />
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="item">
                            <h6>Red Rock Canyon Visitor Center</h6>
                            <p>4:45 PM</p>
                            </div>
                            <div className="form-check d-flex align-items-center justify-content-end">
                            <input
                                className="form-check-input mt-0"
                                type="radio"
                                name="Radio"
                                id="ten"
                                defaultValue="ten"
                            />
                            <label
                                className="form-check-label fs-14 ms-2"
                                htmlFor="ten"
                            />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="offcanvas-footer d-flex align-items-center justify-content-between gap-2 border-top">
            <Link href="#" className="btn btn-light btn-md w-100 rounded-pill">
                Reset{" "}
            </Link>
            <Link href="#" className="btn btn-primary btn-md w-100 rounded-pill">
                Continue{" "}
            </Link>
            </div>
        </div>
        {/* end offcanvas */}
        {/* start offcanvas */}
        <div
            className="offcanvas offcanvas-offset offcanvas-end custom-offcanvas"
            tabIndex={-1}
            id="routes_details"
        >
            <div className="offcanvas-header d-block border-bottom">
            <div className="d-flex align-items-center justify-content-between">
                <h4 className="offcanvas-title fs-20 fw-bold">Route</h4>
                <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                >
                Close
                </button>
            </div>
            </div>
            <div className="offcanvas-body">
            <div className="filter-items">
                <div className="filter-body">
                <div>
                    <div className="offcanvas-date mb-3">
                    <p className="border">30 Thu 2025 - 08:35 AM</p>
                    </div>
                    <div className="offcanvas-item d-flex align-items-center justify-content-center mb-3 pb-3 border-bottom gap-3">
                    <p className="d-flex align-items-center mb-0 gap-1">
                        {" "}
                        <i className="isax isax-clock" /> 07h :15m
                    </p>
                    <i className="fa-solid fa-circle fs-7 text-dark" />
                    <p>Bharat Benz (Sleeper)</p>
                    </div>
                    {/* location Item */}
                    <div className="location-items border-0">
                    <p className="border mb-3 loc-item">New York - 08:35 AM</p>
                    <div className="accordion custom-accordion mb-3">
                        <div className="accordion-item p-0 border-0" id="field_three">
                        <div className="accordion-header">
                            <button
                            className="accordion-button bg-transparent"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#accordion_collapse_one"
                            aria-expanded="false"
                            >
                            04 Stops
                            </button>
                        </div>
                        <div
                            id="accordion_collapse_one"
                            className="accordion-collapse collapse"
                        >
                            <div className="accordion-body">
                            <p className="mb-3">Philadelphia - 10:00 AM </p>
                            <p className="mb-3">Columbus - 12:30 PM </p>
                            <p className="mb-3">Denver - 02:15 PM</p>
                            <p>Cedar City - 03:40 PM </p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <p className="border loc-item">Las Vegas - 4:55 PM</p>
                    </div>
                    <div className="facilities-item card shadow-none">
                    <div className="card-body d-flex align-items-center gap-2">
                        <h6 className="fs-14 fw-medium">Facillities : </h6>
                        <div className="d-flex align-items-center gap-2">
                        <Link href="#">
                            <i className="isax isax-home-wifi4" />
                        </Link>
                        <Link href="#">
                            <i className="isax isax-scissor-15" />
                        </Link>
                        <Link href="#">
                            <i className="isax isax-profile-2user5" />
                        </Link>
                        <Link href="#">
                            <i className="isax isax-wind-2" />
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="offcanvas-footer d-flex align-items-center justify-content-between gap-2 border-top">
            <Link href="#" className="btn btn-primary btn-md w-100 rounded-pill">
                Continue{" "}
            </Link>
            </div>
        </div>
        {/* end offcanvas */}
    </>

    

  )
}

export default BusOffcanvas