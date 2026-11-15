"use client";
import React, { useRef, useState } from 'react';
import Link from "next/link";
import { DatePicker } from '../../../components/common-date-picker/appDatePicker'
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import { all_routes } from '../../../routes/all_routes';
import ImageWithBasePath from '../../../components/image-with-base-path';

interface SectionLink {
    id: string;
    label: string;
}

interface TypeStep {
    name: string;
    sizeClass: string;
    weightClass: string;
    size: string;
    weight: string;
    use: string;
}

interface ColourSwatch {
    name: string;
    bgClass: string;
    hex: string;
    use: string;
}

interface RadiusSample {
    label: string;
    radius?: string;
    pill?: boolean;
}

interface ElevationSample {
    label: string;
    shadowClass: string;
}

interface ButtonSample {
    label: string;
    className: string;
    disabled?: boolean;
}

interface BadgeSample {
    label: string;
    className: string;
    icon?: string;
}

interface AlertSample {
    id: string;
    className: string;
    icon: string;
    text: string;
}

interface SkeletonLine {
    id: string;
    className: string;
    height: string;
    width?: string;
}

const sectionLinks: SectionLink[] = [
    { id: 'sg-type', label: 'Typography' },
    { id: 'sg-color', label: 'Colour' },
    { id: 'sg-shape', label: 'Shape & elevation' },
    { id: 'sg-buttons', label: 'Buttons' },
    { id: 'sg-forms', label: 'Forms & validation' },
    { id: 'sg-cards', label: 'Product card' },
    { id: 'sg-price', label: 'Price & rating' },
    { id: 'sg-badges', label: 'Badges' },
    { id: 'sg-nav', label: 'Tabs & breadcrumbs' },
    { id: 'sg-feedback', label: 'Alerts & toasts' },
    { id: 'sg-states', label: 'Empty & loading states' },
];

const typeScale: TypeStep[] = [
    { name: 'Display', sizeClass: 'fs-40', weightClass: 'fw-700', size: '40px', weight: '700', use: 'Hero headline, one per page' },
    { name: 'Heading 1', sizeClass: 'fs-32', weightClass: 'fw-700', size: '32px', weight: '700', use: 'Page title' },
    { name: 'Heading 2', sizeClass: 'fs-24', weightClass: 'fw-700', size: '24px', weight: '700', use: 'Section heading' },
    { name: 'Heading 3', sizeClass: 'fs-20', weightClass: 'fw-600', size: '20px', weight: '600', use: 'Card title, detail sub-section' },
    { name: 'Heading 4', sizeClass: 'fs-18', weightClass: 'fw-600', size: '18px', weight: '600', use: 'Widget heading' },
    { name: 'Body', sizeClass: 'fs-14', weightClass: 'fw-400', size: '14px', weight: '400', use: 'Default body text' },
    { name: 'Small', sizeClass: 'fs-13', weightClass: 'fw-400', size: '13px', weight: '400', use: 'Meta, helper text, timestamps' },
    { name: 'Label', sizeClass: 'fs-12', weightClass: 'fw-600', size: '12px', weight: '600', use: 'Badges, table headers, eyebrows' },
];

const colourSwatches: ColourSwatch[] = [
    { name: 'Primary', bgClass: 'bg-primary', hex: '#CF3425', use: 'Buttons, links, active states' },
    { name: 'Secondary', bgClass: 'bg-secondary', hex: '#98AA30', use: 'Supporting accents' },
    { name: 'Success', bgClass: 'bg-success', hex: '#04BD6C', use: 'Confirmed, available, included' },
    { name: 'Info', bgClass: 'bg-info', hex: '#155EEF', use: 'Neutral information' },
    { name: 'Warning', bgClass: 'bg-warning', hex: '#FFCA18', use: 'Pending, in review' },
    { name: 'Danger', bgClass: 'bg-danger', hex: '#FF0000', use: 'Cancelled, errors, destructive actions' },
    { name: 'Dark', bgClass: 'bg-dark', hex: '#212E47', use: 'Headings, high-contrast surfaces' },
    { name: 'Light', bgClass: 'bg-light', hex: '#E4EBF1', use: 'Borders, dividers, muted fills' },
];

const radiusSamples: RadiusSample[] = [
    { label: '4px — base', radius: '4px' },
    { label: '8px — cards', radius: '8px' },
    { label: '12px — media', radius: '12px' },
    { label: 'pill — badges', pill: true },
];

const elevationSamples: ElevationSample[] = [
    { label: 'Flat', shadowClass: 'shadow-none' },
    { label: 'Resting', shadowClass: 'shadow-sm' },
    { label: 'Raised', shadowClass: 'shadow' },
];

const buttonVariants: ButtonSample[] = [
    { label: 'Primary', className: 'btn btn-primary' },
    { label: 'Dark', className: 'btn btn-dark' },
    { label: 'Light', className: 'btn btn-light' },
    { label: 'Outline', className: 'btn btn-outline-light' },
    { label: 'Success', className: 'btn btn-success' },
    { label: 'Danger', className: 'btn btn-danger' },
    { label: 'Disabled', className: 'btn btn-primary', disabled: true },
];

const buttonSizes: ButtonSample[] = [
    { label: 'Small', className: 'btn btn-primary btn-sm' },
    { label: 'Medium', className: 'btn btn-primary btn-md' },
    { label: 'Large', className: 'btn btn-primary btn-lg' },
];

const statusBadges: BadgeSample[] = [
    { label: 'Confirmed', className: 'bg-success' },
    { label: 'In review', className: 'bg-warning text-gray-9' },
    { label: 'Cancelled', className: 'bg-danger-transparent text-danger' },
    { label: 'Completed', className: 'bg-light text-gray-9' },
];

const promoBadges: BadgeSample[] = [
    { label: '20% off', className: 'bg-primary' },
    { label: 'Cheapest', className: 'bg-indigo rounded-pill' },
    { label: 'Verified', className: 'bg-success rounded-pill', icon: 'isax-ticket-star5' },
    { label: 'Only 2 left', className: 'bg-danger-transparent text-danger' },
    { label: 'Trending', className: 'bg-info rounded-pill', icon: 'isax-ranking' },
];

const alertSamples: AlertSample[] = [
    {
        id: 'success',
        className: 'alert alert-success d-flex gap-2',
        icon: 'isax-tick-circle',
        text: 'Your booking is confirmed. The e-ticket is in your trip documents.',
    },
    {
        id: 'warning',
        className: 'alert alert-warning d-flex gap-2',
        icon: 'isax-info-circle',
        text: 'A change fee of $85 per traveller applies to this fare.',
    },
    {
        id: 'danger',
        className: 'alert alert-danger d-flex gap-2 mb-4',
        icon: 'isax-warning-2',
        text: 'Payment failed. Check the card number and try again.',
    },
];

const skeletonLines: SkeletonLine[] = [
    { id: 'media', className: 'sg-skeleton mb-3', height: '140px' },
    { id: 'eyebrow', className: 'sg-skeleton mb-2', height: '14px', width: '40%' },
    { id: 'title', className: 'sg-skeleton mb-2', height: '18px', width: '80%' },
    { id: 'meta', className: 'sg-skeleton mb-3', height: '14px', width: '55%' },
];

const countryOptions: string[] = ['Spain', 'India', 'United Kingdom', 'United States'];

const guestOptions: string[] = ['2 adults', '2 adults, 1 child'];

const pillTabs: string[] = ['Upcoming', 'Past'];

const paginationPages: number[] = [1, 2, 3];

const ratingStars: number[] = [1, 2, 3, 4, 5];

const StyleGuide = () => {

    const routes = all_routes;

    const [activePill, setActivePill] = useState<string>('Upcoming');

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Home',
            active: false,
            link: routes.allService1
        },
        {
            label: 'Documentation',
            active: false,
        },
        {
            label: 'Style Guide',
            active: true,
        },
    ];

    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
    // "On this page" links: smooth-scroll to the section, leaving room for the sticky header
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const target = sectionRefs.current[id];
        if (target) {
            const headerOffset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <>
            <Breadcrumb title="Style Guide" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-07" />

            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    <div className="row">
                        {/* Nav */}
                        <div className="col-xl-3 col-lg-4 theiaStickySidebar">
                            <div className="card mb-0">
                                <div className="card-header">
                                    <h2 className="fs-16 mb-0">On this page</h2>
                                </div>
                                <div className="card-body sg-nav">
                                    {sectionLinks.map((link) => (
                                        <Link href={`#${link.id}`} key={link.id} onClick={(e) => scrollToSection(e, link.id)}>
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-9 col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="fs-20 mb-2">DreamsTour component reference</h2>
                                    <p className="fs-14 mb-0">
                                        Every component below uses the template's existing classes, so anything you copy from
                                        this page will match the other pages. Where a pattern did not previously exist anywhere
                                        in the template — empty states, skeletons, toasts — it is marked{' '}
                                        <span className="badge bg-primary-transparent text-primary fs-12">New</span>.
                                    </p>
                                </div>
                            </div>

                            {/* Typography */}
                            <div className="card sg-section" id="sg-type" ref={(el) => { sectionRefs.current["sg-type"] = el; }}>
                                <div className="card-header">
                                    <h3 className="fs-18 mb-0">Typography</h3>
                                </div>
                                <div className="card-body">
                                    <p className="fs-13 text-gray-6 mb-3">
                                        Body text is IBM Plex Sans. Keep to these eight steps rather than reaching for an
                                        arbitrary <code>fs-*</code> value.
                                    </p>
                                    <div className="table-responsive">
                                        <table className="table table-borderless mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Sample</th>
                                                    <th scope="col">Class</th>
                                                    <th scope="col">Size</th>
                                                    <th scope="col">Weight</th>
                                                    <th scope="col">Use for</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {typeScale.map((step) => (
                                                    <tr key={step.name}>
                                                        <td>
                                                            <span className={`${step.sizeClass} ${step.weightClass} text-dark`}>{step.name}</span>
                                                        </td>
                                                        <td className="f">
                                                            <code>.{step.sizeClass}</code>
                                                        </td>
                                                        <td>{step.size}</td>
                                                        <td>{step.weight}</td>
                                                        <td className="fs-13 text-gray-6">{step.use}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Colour */}
                            <div className="card sg-section" id="sg-color" ref={(el) => { sectionRefs.current["sg-color"] = el; }}>
                                <div className="card-header">
                                    <h3 className="fs-18 mb-0">Colour</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row row-gap-3">
                                        {colourSwatches.map((swatch) => (
                                            <div className="col-lg-3 col-sm-6" key={swatch.name}>
                                                <div className="card mb-0">
                                                    <div
                                                        className={swatch.bgClass}
                                                        style={{ height: '72px', borderRadius: '6px 6px 0 0' }}
                                                    />
                                                    <div className="card-body p-3">
                                                        <p className="fs-14 fw-medium text-dark mb-0">{swatch.name}</p>
                                                        <p className="fs-13 text-gray-6 mb-1">
                                                            <code>{swatch.hex}</code>
                                                        </p>
                                                        <p className="fs-13 text-gray-6 mb-0">{swatch.use}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="fs-13 text-gray-6 mt-3 mb-0">
                                        Semantic colour (success / warning / danger) is separate from the brand accent and
                                        should only ever carry meaning, never decoration.
                                    </p>
                                </div>
                            </div>

                            {/* Shape */}
                            <div className="card sg-section" id="sg-shape" ref={(el) => { sectionRefs.current["sg-shape"] = el; }}>
                                <div className="card-header">
                                    <h3 className="fs-18 mb-0">Shape &amp; elevation</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row row-gap-3 mb-4">
                                        {radiusSamples.map((sample) => (
                                            <div className="col-md-3 col-6" key={sample.label}>
                                                <div
                                                    className={`sg-radius ${sample.pill ? 'rounded-pill' : ''}`}
                                                    style={sample.radius ? { borderRadius: sample.radius } : undefined}
                                                >
                                                    {sample.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="row row-gap-3">
                                        {elevationSamples.map((sample) => (
                                            <div className="col-md-4" key={sample.shadowClass}>
                                                <div className={`card mb-0 ${sample.shadowClass}`}>
                                                    <div className="card-body p-3">
                                                        <p className="fs-13 mb-0">
                                                            {sample.label} — <code>.{sample.shadowClass}</code>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="card sg-section" id="sg-buttons" ref={(el) => { sectionRefs.current["sg-buttons"] = el; }}>
                                <div className="card-header">
                                    <h3 className="fs-18 mb-0">Buttons</h3>
                                </div>
                                <div className="card-body">
                                    <p className="fs-13 text-gray-6 mb-2">Variants</p>
                                    <div className="d-flex align-items-center flex-wrap gap-2 mb-4">
                                        {buttonVariants.map((button) => (
                                            <button type="button" className={button.className} disabled={button.disabled} key={button.label}>
                                                {button.label}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="fs-13 text-gray-6 mb-2">Sizes</p>
                                    <div className="d-flex align-items-center flex-wrap gap-2 mb-4">
                                        {buttonSizes.map((button) => (
                                            <button type="button" className={button.className} key={button.label}>
                                                {button.label}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="alert alert-warning d-flex gap-2 mb-0">
                                        <i className="isax isax-info-circle flex-shrink-0 mt-1" />
                                        <span className="fs-13">
                                            Always pair a size class with a variant class. <code>btn btn-sm</code> on its own
                                            renders unstyled — there are 182 such buttons in the existing pages.
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Forms */}
                            <div className="card sg-section" id="sg-forms" ref={(el) => { sectionRefs.current["sg-forms"] = el; }}>
                                <div className="card-header">
                                    <h3 className="fs-18 mb-0">Forms &amp; validation</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row row-gap-3">
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="sg-name">Full name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="sg-name"
                                                name="sg-name"
                                                placeholder="Jeffrey Wilson"
                                                autoComplete="name"
                                            />
                                            <p className="fs-13 text-gray-6 mt-1 mb-0">
                                                Every input needs an <code>id</code>, a matching <code>{'<label for>'}</code> and
                                                an <code>autocomplete</code> token.
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="sg-email">
                                                Email <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control is-invalid"
                                                id="sg-email"
                                                name="sg-email"
                                                defaultValue="jeffrey.wilson"
                                                autoComplete="email"
                                                aria-describedby="sg-email-err"
                                            />
                                            <p className="fs-13 text-danger mt-1 mb-0" id="sg-email-err">
                                                Enter an email address including the @ sign.
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="sg-phone">Phone</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                id="sg-phone"
                                                name="sg-phone"
                                                placeholder="+34 600 000 000"
                                                autoComplete="tel"
                                                inputMode="tel"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="sg-country">Country</label>
                                            <select className="form-control" id="sg-country" name="sg-country" autoComplete="country-name">
                                                {countryOptions.map((option) => (
                                                    <option key={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="sg-date">Travel date</label>
                                            <div className="input-icon-end position-relative">
                                                <DatePicker
                                                    className="form-control datetimepicker"
                                                    id="sg-date"
                                                    placeholder="dd/mm/yyyy"
                                                    format="DD/MM/YYYY"
                                                />
                                                <span className="input-icon-addon">
                                                    <i className="isax isax-calendar" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="sg-guests">Guests</label>
                                            <select className="form-control" id="sg-guests" name="sg-guests">
                                                {guestOptions.map((option) => (
                                                    <option key={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="sg-terms" />
                                                <label className="form-check-label fs-14" htmlFor="sg-terms">
                                                    I accept the terms and the cancellation policy
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Product card */}
                            <div className="card sg-section" id="sg-cards" ref={(el) => { sectionRefs.current["sg-cards"] = el; }}>
                                <div className="card-header">
                                    <h3 className="fs-18 mb-0">Product card</h3>
                                </div>
                                <div className="card-body">
                                    <p className="fs-13 text-gray-6 mb-3">
                                        One card object for all nine modules: 16:10 media, wishlist top-right, badge top-left,
                                        then title, location, rating, price and CTA in the same place every time.
                                    </p>
                                    <div className="row row-gap-3">
                                        <div className="col-lg-4 col-md-6">
                                            <div className="card mb-0">
                                                <div className="position-relative">
                                                    <ImageWithBasePath
                                                        src="assets/img/tours/tours-01.jpg"
                                                        className="img-fluid w-100"
                                                        alt="Rainbow Mountain Valley trek"
                                                        style={{ height: '180px', objectFit: 'cover', borderRadius: '6px 6px 0 0' }}
                                                    />
                                                    <span className="badge bg-primary position-absolute top-0 start-0 m-2">Adventure</span>
                                                    <Link
                                                        href="#"
                                                        className="btn btn-white btn-icon btn-sm position-absolute top-0 end-0 m-2"
                                                        aria-label="Add to wishlist"
                                                    >
                                                        <i className="isax isax-heart" />
                                                    </Link>
                                                </div>
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center gap-1 mb-2">
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-12">4.9</span>
                                                        <span className="fs-13 text-gray-6">(400 reviews)</span>
                                                    </div>
                                                    <h4 className="fs-16 mb-1">
                                                        <Link href={routes.tourDetails}>Rainbow Mountain Valley</Link>
                                                    </h4>
                                                    <p className="fs-13 text-gray-6 mb-3">
                                                        <i className="isax isax-location5 me-1" />
                                                        Cusco Region, Peru
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div>
                                                            <span className="fs-13 text-gray-6 text-decoration-line-through">$680</span>{' '}
                                                            <span className="fs-18 fw-semibold text-dark ms-1">$549</span>
                                                            <span className="fs-13 text-gray-6 d-block">per person</span>
                                                        </div>
                                                        <Link href={routes.tourDetails} className="btn btn-primary btn-sm">
                                                            Book Now
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Price & rating */}
                            <div className="card sg-section" id="sg-price" ref={(el) => { sectionRefs.current["sg-price"] = el; }}>
                                <div className="card-header">
                                    <h3 className="fs-18 mb-0">Price &amp; rating</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row row-gap-3">
                                        <div className="col-md-6">
                                            <p className="fs-13 text-gray-6 mb-2">Price block — always carries a per-unit label</p>
                                            <span className="fs-14 text-gray-6 text-decoration-line-through">$680</span>{' '}
                                            <span className="fs-24 fw-semibold text-dark ms-1">$549</span>{' '}
                                            <span className="fs-13 text-gray-6">per person</span>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="fs-13 text-gray-6 mb-2">Rating — never stars alone</p>
                                            <div className="d-flex align-items-center gap-2">
                                                <span className="badge badge-warning text-gray-9 fs-14">4.9</span>
                                                <span className="rating">
                                                    {ratingStars.map((star) => (
                                                        <i className="fa-solid fa-star filled" key={star} />
                                                    ))}
                                                </span>
                                                <span className="fs-13 text-gray-6">400 reviews</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Badges */}
                            <div className="card sg-section" id="sg-badges" ref={(el) => { sectionRefs.current["sg-badges"] = el; }}>
                                <div className="card-header">
                                    <h3 className="fs-18 mb-0">Badges</h3>
                                </div>
                                <div className="card-body">
                                    <p className="fs-13 text-gray-6 mb-2">Status</p>
                                    <div className="d-flex align-items-center flex-wrap gap-2 mb-4">
                                        {statusBadges.map((badge) => (
                                            <span className={`badge ${badge.className}`} key={badge.label}>
                                                {badge.label}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="fs-13 text-gray-6 mb-2">Promotional &amp; availability</p>
                                    <div className="d-flex align-items-center flex-wrap gap-2 mb-0">
                                        {promoBadges.map((badge) => (
                                            <span className={`badge ${badge.className}`} key={badge.label}>
                                                {badge.icon && <i className={`isax ${badge.icon} me-1`} />}
                                                {badge.label}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Tabs & breadcrumbs */}
                            <div className="card sg-section" id="sg-nav" ref={(el) => { sectionRefs.current["sg-nav"] = el; }}>
                                <div className="card-header">
                                    <h3 className="fs-18 mb-0">Tabs &amp; breadcrumbs</h3>
                                </div>
                                <div className="card-body">
                                    <p className="fs-13 text-gray-6 mb-2">Pills — for filtering a set</p>
                                    <ul className="nav nav-pills gap-2 mb-4">
                                        {pillTabs.map((pill) => (
                                            <li className="nav-item" key={pill}>
                                                <button
                                                    className={`nav-link ${activePill === pill ? 'active' : ''}`}
                                                    type="button"
                                                    onClick={() => setActivePill(pill)}
                                                >
                                                    {pill}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="fs-13 text-gray-6 mb-2">Breadcrumb</p>
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb mb-4">
                                            <li className="breadcrumb-item">
                                                <Link href={routes.allService1}>
                                                    <i className="isax isax-home5" />
                                                </Link>
                                            </li>
                                            <li className="breadcrumb-item">Hotel</li>
                                            <li className="breadcrumb-item active" aria-current="page">Hotel Details</li>
                                        </ol>
                                    </nav>
                                    <p className="fs-13 text-gray-6 mb-2">Pagination — always with a result count</p>
                                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                        <p className="fs-13 text-gray-6 mb-0">Showing 1–20 of 480</p>
                                        <nav aria-label="Page navigation">
                                            <ul className="pagination mb-0">
                                                <li className="page-item disabled">
                                                    <Link className="page-link" href="#" aria-label="Previous">
                                                        <i className="isax isax-arrow-left-2" />
                                                    </Link>
                                                </li>
                                                {paginationPages.map((page) => (
                                                    <li
                                                        className={`page-item ${page === 1 ? 'active' : ''}`}
                                                        aria-current={page === 1 ? 'page' : undefined}
                                                        key={page}
                                                    >
                                                        <Link className="page-link" href="#">{page}</Link>
                                                    </li>
                                                ))}
                                                <li className="page-item">
                                                    <Link className="page-link" href="#" aria-label="Next">
                                                        <i className="isax isax-arrow-right-3" />
                                                    </Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            {/* Feedback */}
                            <div className="card sg-section" id="sg-feedback" ref={(el) => { sectionRefs.current["sg-feedback"] = el; }}>
                                <div className="card-header d-flex align-items-center gap-2">
                                    <h3 className="fs-18 mb-0">Alerts &amp; toasts</h3>
                                    <span className="badge bg-primary-transparent text-primary fs-12">Toasts are new</span>
                                </div>
                                <div className="card-body">
                                    {alertSamples.map((alert) => (
                                        <div className={alert.className} key={alert.id}>
                                            <i className={`isax ${alert.icon} flex-shrink-0 mt-1`} />
                                            <span className="fs-14">{alert.text}</span>
                                        </div>
                                    ))}
                                    <p className="fs-13 text-gray-6 mb-2">
                                        Toast — for transient confirmations such as adding to a wishlist or copying a coupon code
                                    </p>
                                    <div className="toast show" role="alert" aria-live="polite" aria-atomic="true">
                                        <div className="toast-header">
                                            <i className="isax isax-heart5 text-danger me-2" />
                                            <strong className="me-auto fs-14">Saved to wishlist</strong>
                                            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                                        </div>
                                        <div className="toast-body fs-13">Rainbow Mountain Valley was added to your wishlist.</div>
                                    </div>
                                </div>
                            </div>

                            {/* Empty & loading */}
                            <div className="card sg-section mb-0" id="sg-states">
                                <div className="card-header d-flex align-items-center gap-2">
                                    <h3 className="fs-18 mb-0">Empty &amp; loading states</h3>
                                    <span className="badge bg-primary-transparent text-primary fs-12">New</span>
                                </div>
                                <div className="card-body">
                                    <p className="fs-13 text-gray-6 mb-3">
                                        Neither pattern existed anywhere in the template. A filtered listing that returns
                                        nothing is the highest-frequency state on a search page.
                                    </p>
                                    <div className="row row-gap-3">
                                        <div className="col-md-6">
                                            <div className="card mb-0">
                                                <div className="card-body text-center py-5">
                                                    <span className="avatar avatar-xxl rounded-circle bg-light text-gray-5 mx-auto mb-3">
                                                        <i className="isax isax-search-normal-1 fs-32" />
                                                    </span>
                                                    <h4 className="fs-16 mb-2">No hotels match these filters</h4>
                                                    <p className="fs-14 text-gray-6 mb-3">
                                                        Try widening your price range or removing a filter.
                                                    </p>
                                                    <button type="button" className="btn btn-primary btn-sm">Clear all filters</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="card mb-0">
                                                <div className="card-body">
                                                    {skeletonLines.map((line) => (
                                                        <div
                                                            className={line.className}
                                                            style={{ height: line.height, width: line.width }}
                                                            key={line.id}
                                                        />
                                                    ))}
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="sg-skeleton" style={{ height: '22px', width: '30%' }} />
                                                        <div className="sg-skeleton" style={{ height: '32px', width: '88px' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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

export default StyleGuide;
