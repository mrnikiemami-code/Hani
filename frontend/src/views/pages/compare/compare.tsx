"use client";
import React, { useState } from 'react';
import Link from "next/link";
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import { all_routes } from '../../../routes/all_routes';
import ImageWithBasePath from '../../../components/image-with-base-path';

type CompareTabId = 'cmp-hotels' | 'cmp-flights' | 'cmp-cars';
type HotelId = 'h1' | 'h2' | 'h3';
type FlightId = 'f1' | 'f2';

interface Verdict {
    id: string;
    avatarClass: string;
    icon: string;
    labelClass: string;
    label: string;
    title: string;
    text: string;
}

interface CompareTab {
    id: CompareTabId;
    label: string;
    icon: string;
    count: number;
}

interface CompareRibbon {
    label: string;
    className: string;
}

interface HotelColumn {
    id: HotelId;
    name: string;
    image: string;
    ribbon?: CompareRibbon;
    rating: string;
    reviews: string;
    neighbourhood: string;
    total: string;
}

interface FlightColumn {
    id: FlightId;
    name: string;
    alt: string;
    image: string;
    ribbon: CompareRibbon;
    details: string;
    total: string;
}

type CompareCell =
    | { type: 'price'; value: string; best?: boolean }
    | { type: 'text'; value: string; best?: boolean }
    | { type: 'rating'; value: number; best?: boolean }
    | { type: 'bool'; value: boolean; label: string; best?: boolean };

interface CompareRow<K extends string> {
    id: string;
    label: string;
    note?: string;
    same?: boolean;
    cells: Record<K, CompareCell>;
}

interface CompareGroup<K extends string> {
    id: string;
    title: string;
    rows: CompareRow<K>[];
}

const priceCell = (value: string, best = false): CompareCell => ({ type: 'price', value, best });
const textCell = (value: string, best = false): CompareCell => ({ type: 'text', value, best });
const ratingCell = (value: number, best = false): CompareCell => ({ type: 'rating', value, best });
const yesCell: CompareCell = { type: 'bool', value: true, label: 'Included' };
const noCell: CompareCell = { type: 'bool', value: false, label: 'Not included' };

const verdicts: Verdict[] = [
    {
        id: 'lowest-price',
        avatarClass: 'bg-success-transparent text-success',
        icon: 'isax-tag-2',
        labelClass: 'text-success',
        label: 'Lowest price',
        title: 'Casa Rambla Suites',
        text: '$354 total — $84 less than the next option',
    },
    {
        id: 'best-rated',
        avatarClass: 'bg-warning-transparent text-warning',
        icon: 'isax-star-1',
        labelClass: 'text-warning',
        label: 'Best rated',
        title: 'Hotel Miravent Barcelona',
        text: '4.9 from 400 reviews, and closest to the centre',
    },
    {
        id: 'most-complete',
        avatarClass: 'bg-primary-transparent text-primary',
        icon: 'isax-award',
        labelClass: 'text-primary',
        label: 'Most complete',
        title: 'Port Vell Marina Hotel',
        text: 'Only one with a pool and an airport shuttle',
    },
];

const hotelColumns: HotelColumn[] = [
    {
        id: 'h1',
        name: 'Hotel Miravent Barcelona',
        image: 'assets/img/hotels/hotel-01.jpg',
        ribbon: { label: 'Top rated', className: 'bg-warning text-gray-9' },
        rating: '4.9',
        reviews: '400',
        neighbourhood: 'Ciutat Vella',
        total: '$438',
    },
    {
        id: 'h2',
        name: 'Casa Rambla Suites',
        image: 'assets/img/hotels/hotel-02.jpg',
        ribbon: { label: 'Lowest price', className: 'bg-success' },
        rating: '4.6',
        reviews: '268',
        neighbourhood: 'El Raval',
        total: '$354',
    },
    {
        id: 'h3',
        name: 'Port Vell Marina Hotel',
        image: 'assets/img/hotels/hotel-03.jpg',
        rating: '4.8',
        reviews: '512',
        neighbourhood: 'Barceloneta',
        total: '$546',
    },
];

const hotelGroups: CompareGroup<HotelId>[] = [
    {
        id: 'price',
        title: 'Price',
        rows: [
            {
                id: 'price-per-night',
                label: 'Price per night',
                cells: { h1: priceCell('$146'), h2: priceCell('$118', true), h3: priceCell('$182') },
            },
            {
                id: 'total',
                label: 'Total for 3 nights',
                note: '2 adults, 1 room',
                cells: { h1: priceCell('$438'), h2: priceCell('$354', true), h3: priceCell('$546') },
            },
            {
                id: 'taxes',
                label: 'Taxes & city fee',
                note: 'Payable at the property',
                cells: { h1: textCell('€3.25 pppn'), h2: textCell('€3.25 pppn'), h3: textCell('€4.00 pppn') },
            },
        ],
    },
    {
        id: 'location-rating',
        title: 'Location & rating',
        rows: [
            {
                id: 'guest-rating',
                label: 'Guest rating',
                cells: { h1: ratingCell(4.9, true), h2: ratingCell(4.6), h3: ratingCell(4.8) },
            },
            {
                id: 'reviews',
                label: 'Reviews',
                cells: { h1: textCell('400'), h2: textCell('268'), h3: textCell('512') },
            },
            {
                id: 'neighbourhood',
                label: 'Neighbourhood',
                cells: { h1: textCell('Ciutat Vella'), h2: textCell('El Raval'), h3: textCell('Barceloneta') },
            },
            {
                id: 'distance',
                label: 'Distance to centre',
                note: 'Walking',
                cells: { h1: textCell('0.4 km', true), h2: textCell('1.1 km'), h3: textCell('2.3 km') },
            },
            {
                id: 'metro',
                label: 'Nearest metro',
                cells: { h1: textCell('Jaume I · 3 min'), h2: textCell('Liceu · 6 min'), h3: textCell('Barceloneta · 8 min') },
            },
        ],
    },
    {
        id: 'included',
        title: 'What’s included',
        rows: [
            { id: 'breakfast', label: 'Breakfast', cells: { h1: yesCell, h2: noCell, h3: yesCell } },
            { id: 'wifi', label: 'Free Wi-Fi', same: true, cells: { h1: yesCell, h2: yesCell, h3: yesCell } },
            { id: 'air-conditioning', label: 'Air conditioning', same: true, cells: { h1: yesCell, h2: yesCell, h3: yesCell } },
            { id: 'pool', label: 'Pool', cells: { h1: noCell, h2: yesCell, h3: yesCell } },
            { id: 'airport-shuttle', label: 'Airport shuttle', cells: { h1: noCell, h2: noCell, h3: yesCell } },
            { id: 'pet-friendly', label: 'Pet friendly', cells: { h1: noCell, h2: yesCell, h3: noCell } },
        ],
    },
    {
        id: 'policies',
        title: 'Policies',
        rows: [
            {
                id: 'free-cancellation',
                label: 'Free cancellation',
                note: 'Until 23 May',
                cells: { h1: yesCell, h2: yesCell, h3: noCell },
            },
            { id: 'pay-at-property', label: 'Pay at the property', cells: { h1: yesCell, h2: yesCell, h3: noCell } },
            { id: 'check-in', label: 'Check-in', cells: { h1: textCell('15:00'), h2: textCell('14:00'), h3: textCell('15:00') } },
            { id: 'check-out', label: 'Check-out', cells: { h1: textCell('11:00'), h2: textCell('11:00'), h3: textCell('12:00') } },
        ],
    },
];

const flightColumns: FlightColumn[] = [
    {
        id: 'f1',
        name: 'Air India · AI 191',
        alt: 'Air India AI 191',
        image: 'assets/img/flight/flight-01.jpg',
        ribbon: { label: 'Lowest price', className: 'bg-success' },
        details: 'Boeing 787-9 · 1 stop',
        total: '$1,248',
    },
    {
        id: 'f2',
        name: 'Air India · AI 137',
        alt: 'Air India AI 137',
        image: 'assets/img/flight/flight-02.jpg',
        ribbon: { label: 'Fastest', className: 'bg-warning text-gray-9' },
        details: 'Airbus A350-900 · non-stop',
        total: '$1,392',
    },
];

const notRefundableCell: CompareCell = { type: 'bool', value: false, label: 'Not refundable' };

const flightGroups: CompareGroup<FlightId>[] = [
    {
        id: 'price',
        title: 'Price',
        rows: [
            { id: 'fare', label: 'Fare', note: '2 travellers', cells: { f1: priceCell('$1,248', true), f2: priceCell('$1,392') } },
            { id: 'seat-fees', label: 'Seat fees', cells: { f1: textCell('From $9 each'), f2: textCell('Free', true) } },
        ],
    },
    {
        id: 'journey',
        title: 'Journey',
        rows: [
            { id: 'duration', label: 'Total duration', cells: { f1: textCell('13h 45m'), f2: textCell('11h 20m', true) } },
            { id: 'stops', label: 'Stops', cells: { f1: textCell('1 · Dubai, 2h 10m'), f2: textCell('Non-stop', true) } },
            { id: 'departs', label: 'Departs', cells: { f1: textCell('04:45 · DEL T3'), f2: textCell('13:20 · DEL T3') } },
            { id: 'arrives', label: 'Arrives', cells: { f1: textCell('14:30 · BCN T1'), f2: textCell('19:40 · BCN T1') } },
        ],
    },
    {
        id: 'included',
        title: 'Included',
        rows: [
            { id: 'checked-baggage', label: 'Checked baggage', cells: { f1: textCell('25 kg'), f2: textCell('30 kg', true) } },
            { id: 'cabin-baggage', label: 'Cabin baggage', same: true, cells: { f1: textCell('7 kg'), f2: textCell('7 kg') } },
            { id: 'meal', label: 'Meal included', cells: { f1: yesCell, f2: yesCell } },
        ],
    },
    {
        id: 'fare-rules',
        title: 'Fare rules',
        rows: [
            {
                id: 'date-change',
                label: 'Date change',
                same: true,
                cells: { f1: textCell('$85 + difference'), f2: textCell('$85 + difference') },
            },
            { id: 'refundable', label: 'Refundable', same: true, cells: { f1: notRefundableCell, f2: notRefundableCell } },
        ],
    },
];

const compareTabs: CompareTab[] = [
    { id: 'cmp-hotels', label: 'Hotels', icon: 'isax-buildings-2', count: hotelColumns.length },
    { id: 'cmp-flights', label: 'Flights', icon: 'isax-airplane', count: flightColumns.length },
    { id: 'cmp-cars', label: 'Cars', icon: 'isax-car', count: 0 },
];

const hotelIds: HotelId[] = hotelColumns.map((column) => column.id);
const flightIds: FlightId[] = flightColumns.map((column) => column.id);

const renderCellContent = (cell: CompareCell) => {
    switch (cell.type) {
        case 'price':
            return <span className="fs-16 fw-semibold text-dark">{cell.value}</span>;
        case 'text':
            return <span className="fs-14">{cell.value}</span>;
        case 'rating':
            return (
                <span className="d-flex align-items-center gap-2">
                    <span className="fs-15 fw-semibold text-dark">{cell.value}</span>
                    <span className="cmp-meter" role="img" aria-label={`${cell.value} out of 5`}>
                        <span className="cmp-meter-fill" style={{ width: `${Math.round(cell.value * 20)}%` }} />
                    </span>
                </span>
            );
        case 'bool':
            return cell.value ? (
                <span className="cmp-yes">
                    <i className="isax isax-tick-circle5" />
                    <span className="visually-hidden">{cell.label}</span>
                </span>
            ) : (
                <>
                    <span className="cmp-no" aria-hidden="true">—</span>
                    <span className="visually-hidden">{cell.label}</span>
                </>
            );
    }
};

// Shared <tbody> markup for every comparison table: group heading rows followed by attribute rows
const renderCompareBody = <K extends string>(groups: CompareGroup<K>[], columnIds: K[], markCells: boolean) =>
    groups.map((group) => (
        <React.Fragment key={group.id}>
            <tr className="cmp-group">
                <th scope="colgroup" colSpan={columnIds.length + 1}>{group.title}</th>
            </tr>
            {group.rows.map((row) => (
                <tr key={row.id} data-row="" data-same={row.same ? 'true' : undefined}>
                    <th scope="row" className="cmp-rail">
                        {row.label}
                        {row.note && <span className="d-block fs-12 text-gray-6 fw-normal">{row.note}</span>}
                    </th>
                    {columnIds.map((columnId) => {
                        const cell = row.cells[columnId];
                        return (
                            <td
                                key={columnId}
                                className={cell.best ? 'is-best' : undefined}
                                data-col-cell={markCells ? '' : undefined}
                            >
                                {renderCellContent(cell)}
                                {cell.best && <span className="cmp-best">Best</span>}
                            </td>
                        );
                    })}
                </tr>
            ))}
        </React.Fragment>
    ));

const Compare = () => {

    const routes = all_routes;

    const [activeTab, setActiveTab] = useState<CompareTabId>('cmp-hotels');

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Home',
            active: false,
            link: routes.allService1
        },
        {
            label: 'Tools',
            active: false,
        },
        {
            label: 'Compare',
            active: true,
        },
    ];

    return (
        <>
            <Breadcrumb title="Compare" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-07" />

            {/* Page Wrapper */}
            <div className="content">
                <div className="container">

                    {/* Verdict */}
                    <div className="mb-4">
                        <h2 className="fs-20 mb-1">Three hotels in Barcelona, side by side</h2>
                        <p className="fs-14 text-gray-6 mb-3">
                            25–28 May · 3 nights · 2 adults. Prices include taxes except the city fee.
                        </p>
                        <div className="row row-gap-3">
                            {verdicts.map((verdict) => (
                                <div className="col-lg-4 col-md-6 d-flex" key={verdict.id}>
                                    <div className="cmp-verdict flex-fill">
                                        <span className={`avatar avatar-md rounded-circle ${verdict.avatarClass} flex-shrink-0 mb-2`}>
                                            <i className={`isax ${verdict.icon} fs-18`} />
                                        </span>
                                        <p
                                            className={`fs-12 fw-semibold text-uppercase ${verdict.labelClass} mb-1`}
                                            style={{ letterSpacing: '.06em' }}
                                        >
                                            {verdict.label}
                                        </p>
                                        <p className="fs-15 fw-semibold text-dark mb-1">{verdict.title}</p>
                                        <p className="fs-13 text-gray-6 mb-0">{verdict.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Category tabs + controls */}
                    <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-3">
                        <ul className="nav nav-pills gap-2" role="tablist">
                            {compareTabs.map((tab) => (
                                <li className="nav-item" role="presentation" key={tab.id}>
                                    <button
                                        className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                                        data-bs-toggle="pill"
                                        data-bs-target={`#${tab.id}`}
                                        type="button"
                                        role="tab"
                                        aria-selected={activeTab === tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        <i className={`isax ${tab.icon} me-1`} />
                                        {tab.label}{' '}
                                        <span className={`badge ${activeTab === tab.id ? 'bg-white' : 'bg-light'} text-dark ms-1`}>
                                            {tab.count}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <Link href={routes.hotelList} className="btn btn-light btn-sm">
                            <i className="isax isax-add me-1" />
                            Add another
                        </Link>
                    </div>

                    <div className="tab-content">
                        {/* Hotels */}
                        <div className="tab-pane fade show active" id="cmp-hotels" role="tabpanel">
                            <div className="card">
                                <div className="card-body p-0">
                                    <div className="cmp-wrap">
                                        <table className="table cmp-table" id="cmpHotels">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="cmp-corner">
                                                        <span
                                                            className="fs-12 fw-semibold text-uppercase text-gray-6"
                                                            style={{ letterSpacing: '.06em' }}
                                                        >
                                                            Comparing
                                                        </span>
                                                        <span className="d-block fs-15 fw-semibold text-dark">
                                                            {hotelColumns.length} hotels
                                                        </span>
                                                    </th>
                                                    {hotelColumns.map((hotel) => (
                                                        <th scope="col" className="cmp-col" data-col={hotel.id} key={hotel.id}>
                                                            <div className="cmp-head">
                                                                <div className="cmp-head-media">
                                                                    <ImageWithBasePath src={hotel.image} alt={hotel.name} />
                                                                    {hotel.ribbon && (
                                                                        <span className={`badge ${hotel.ribbon.className} cmp-ribbon`}>
                                                                            {hotel.ribbon.label}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className="d-flex align-items-center gap-1 mb-1">
                                                                    <span className="badge badge-warning badge-xs text-gray-9 fs-12">
                                                                        {hotel.rating}
                                                                    </span>
                                                                    <span className="fs-12 text-gray-6 fw-normal">({hotel.reviews})</span>
                                                                </div>
                                                                <p className="fs-15 fw-semibold text-dark mb-1">{hotel.name}</p>
                                                                <p className="fs-13 text-gray-6 fw-normal mb-2">
                                                                    <i className="isax isax-location5 me-1" />
                                                                    {hotel.neighbourhood}
                                                                </p>
                                                                <p className="mb-2">
                                                                    <span className="fs-20 fw-semibold text-dark">{hotel.total}</span>
                                                                    <span className="fs-13 text-gray-6 fw-normal"> total</span>
                                                                </p>
                                                                <Link href={routes.hotelRoomSelection} className="btn btn-primary btn-sm w-100">
                                                                    Select rooms
                                                                </Link>
                                                            </div>
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {renderCompareBody(hotelGroups, hotelIds, true)}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="row row-gap-3">
                                <div className="col-lg-12 col-md-12">
                                    <div className="cmp-slot">
                                        <span className="avatar avatar-xl rounded-circle bg-light text-gray-5 mx-auto mb-2">
                                            <i className="isax isax-add fs-24" />
                                        </span>
                                        <p className="fs-14 fw-medium text-dark mb-1">Add a fourth hotel</p>
                                        <p className="fs-13 text-gray-6 mb-3">Compare up to four at once.</p>
                                        <Link href={routes.hotelList} className="btn btn-light btn-sm">Browse hotels</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Flights */}
                        <div className="tab-pane fade" id="cmp-flights" role="tabpanel">
                            <div className="card mb-0">
                                <div className="card-body p-0">
                                    <div className="cmp-wrap">
                                        <table className="table cmp-table" id="cmpFlights">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="cmp-corner">
                                                        <span
                                                            className="fs-12 fw-semibold text-uppercase text-gray-6"
                                                            style={{ letterSpacing: '.06em' }}
                                                        >
                                                            Comparing
                                                        </span>
                                                        <span className="d-block fs-15 fw-semibold text-dark">
                                                            {flightColumns.length} flights
                                                        </span>
                                                    </th>
                                                    {flightColumns.map((flight) => (
                                                        <th scope="col" className="cmp-col" key={flight.id}>
                                                            <div className="cmp-head">
                                                                <div className="cmp-head-media">
                                                                    <ImageWithBasePath src={flight.image} alt={flight.alt} />
                                                                    <span className={`badge ${flight.ribbon.className} cmp-ribbon`}>
                                                                        {flight.ribbon.label}
                                                                    </span>
                                                                </div>
                                                                <p className="fs-15 fw-semibold text-dark mb-1">{flight.name}</p>
                                                                <p className="fs-13 text-gray-6 fw-normal mb-2">{flight.details}</p>
                                                                <p className="mb-2">
                                                                    <span className="fs-20 fw-semibold text-dark">{flight.total}</span>
                                                                    <span className="fs-13 text-gray-6 fw-normal"> total</span>
                                                                </p>
                                                                <Link href={routes.flightSeatSelection} className="btn btn-primary btn-sm w-100">
                                                                    Select seats
                                                                </Link>
                                                            </div>
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {renderCompareBody(flightGroups, flightIds, false)}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cars: empty state */}
                        <div className="tab-pane fade" id="cmp-cars" role="tabpanel">
                            <div className="card mb-0">
                                <div className="card-body text-center py-5">
                                    <span className="avatar avatar-xxl rounded-circle bg-light text-gray-5 mx-auto mb-3">
                                        <i className="isax isax-car fs-32" />
                                    </span>
                                    <h2 className="fs-18 mb-2">Nothing to compare yet</h2>
                                    <p className="fs-14 text-gray-6 mb-3">
                                        Add cars from any listing using the compare icon on a card.
                                    </p>
                                    <Link href={routes.carList} className="btn btn-primary">Browse cars</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}
        </>
    );
};

export default Compare;
