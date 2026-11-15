"use client";
import React, { useRef, useState } from 'react';
import Link from "next/link";
import { DatePicker } from '../../../components/common-date-picker/appDatePicker'
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import { all_routes } from '../../../routes/all_routes';
import ImageWithBasePath from '../../../components/image-with-base-path';

type StepState = 'done' | 'current' | 'upcoming';

interface ApplicationStep {
    id: string;
    number: number;
    label: string;
    state: StepState;
}

type DocumentStatus = 'uploaded' | 'missing' | 'action';

interface VisaDocument {
    id: string;
    title: string;
    requirement: string;
    status: DocumentStatus;
    fileName?: string;
    fileSize?: string;
    error?: string;
}

interface StatusBadge {
    label: string;
    className: string;
}

interface SummaryRow {
    label: string;
    value: string;
}

const applicationSteps: ApplicationStep[] = [
    { id: 'applicant', number: 1, label: 'Applicant', state: 'done' },
    { id: 'travel-details', number: 2, label: 'Travel details', state: 'done' },
    { id: 'documents', number: 3, label: 'Documents', state: 'current' },
    { id: 'fees', number: 4, label: 'Fees', state: 'upcoming' },
    { id: 'review', number: 5, label: 'Review', state: 'upcoming' },
];

const initialDocuments: VisaDocument[] = [
    {
        id: 'passport-bio',
        title: 'Passport bio page',
        requirement: 'Colour scan, all four corners visible',
        status: 'uploaded',
        fileName: 'passport-bio.pdf',
        fileSize: '1.2 MB',
    },
    {
        id: 'passport-photo',
        title: 'Passport photograph',
        requirement: '35 × 45 mm, white background, taken in the last 6 months',
        status: 'uploaded',
        fileName: 'photo.jpg',
        fileSize: '480 KB',
    },
    {
        id: 'accommodation',
        title: 'Proof of accommodation',
        requirement: 'Hotel booking confirmation covering every night',
        status: 'uploaded',
        fileName: 'hotel-voucher.pdf',
        fileSize: '96 KB',
    },
    {
        id: 'flight-itinerary',
        title: 'Return flight itinerary',
        requirement: 'Confirmed booking showing entry and exit dates',
        status: 'missing',
    },
    {
        id: 'bank-statements',
        title: 'Bank statements',
        requirement: 'Last 3 months, showing at least €100 per day of stay',
        status: 'missing',
    },
    {
        id: 'travel-insurance',
        title: 'Travel insurance',
        requirement: 'Minimum €30,000 medical cover valid across the Schengen area',
        status: 'action',
        error: 'Cover below the minimum — please upload a new certificate',
    },
];

const documentBadges: Record<DocumentStatus, StatusBadge> = {
    uploaded: { label: 'Uploaded', className: 'bg-success-transparent text-success' },
    missing: { label: 'Not uploaded', className: 'bg-light text-gray-6' },
    action: { label: 'Action needed', className: 'bg-danger-transparent text-danger' },
};

const nationalityOptions: string[] = ['India', 'United Kingdom', 'United States', 'Canada', 'Australia'];

const purposeOptions: string[] = ['Tourism', 'Business', 'Visiting family or friends', 'Study', 'Transit'];

const applicationSummary: SummaryRow[] = [
    { label: 'Visa type', value: 'Tourist, single entry' },
    { label: 'Processing', value: '10–15 working days' },
    { label: 'Applicants', value: '1' },
];

const feeRows: SummaryRow[] = [
    { label: 'Government fee', value: '€90.00' },
    { label: 'Service charge', value: '€35.00' },
    { label: 'Courier return', value: '€12.00' },
];

const acceptedFileTypes = '.pdf,.jpg,.jpeg,.png';

const formatFileSize = (bytes: number): string => {
    if (bytes >= 1024 * 1024) {
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
};

const attachFile = (doc: VisaDocument, file: File): VisaDocument => ({
    ...doc,
    status: 'uploaded',
    fileName: file.name,
    fileSize: formatFileSize(file.size),
    error: undefined,
});

const VisaApplication = () => {

    const routes = all_routes;

    const [documents, setDocuments] = useState<VisaDocument[]>(initialDocuments);
    const replaceInputRef = useRef<HTMLInputElement>(null);
    const replaceTargetRef = useRef<string | null>(null);

    const uploadedCount = documents.filter((doc) => doc.status === 'uploaded').length;
    const remainingCount = documents.length - uploadedCount;

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Home',
            active: false,
            link: routes.allService1
        },
        {
            label: 'Visa',
            active: false,
        },
        {
            label: 'Visa Application',
            active: true,
        },
    ];

    // Drop zone / "Choose files": fill the requirements that still need a file, in list order
    const assignFiles = (files: FileList | null) => {
        if (!files || files.length === 0) {
            return;
        }
        const queue = Array.from(files);
        setDocuments((prev) => {
            const pending = [...queue];
            return prev.map((doc) => {
                if (doc.status === 'uploaded') {
                    return doc;
                }
                const file = pending.shift();
                return file ? attachFile(doc, file) : doc;
            });
        });
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        assignFiles(e.dataTransfer.files);
    };

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        assignFiles(e.target.files);
        e.target.value = '';
    };

    // Replace / Upload / Re-upload on a single requirement row
    const openReplacePicker = (e: React.MouseEvent<HTMLAnchorElement>, docId: string) => {
        e.preventDefault();
        replaceTargetRef.current = docId;
        replaceInputRef.current?.click();
    };

    const handleReplaceFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const targetId = replaceTargetRef.current;
        if (file && targetId) {
            setDocuments((prev) => prev.map((doc) => (doc.id === targetId ? attachFile(doc, file) : doc)));
        }
        e.target.value = '';
    };

    const removeFile = (e: React.MouseEvent<HTMLAnchorElement>, docId: string) => {
        e.preventDefault();
        setDocuments((prev) =>
            prev.map((doc) =>
                doc.id === docId
                    ? { id: doc.id, title: doc.title, requirement: doc.requirement, status: 'missing' }
                    : doc
            )
        );
    };

    return (
        <>
            <Breadcrumb title="Visa Application" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-07" />

            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    <Link href={routes.visaDetails} className="fs-14 fw-medium d-inline-flex align-items-center gap-1 mb-4">
                        <i className="isax isax-arrow-left4 fw-semibold" />
                        Back to Visa Details
                    </Link>

                    {/* Stepper */}
                    <div className="card mb-4">
                        <div className="card-body py-3">
                            <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                                {applicationSteps.map((step, index) => (
                                    <React.Fragment key={step.id}>
                                        {index > 0 && <span className="d-none d-lg-block flex-fill border-top mx-3" />}
                                        <div className="d-flex align-items-center gap-2">
                                            {step.state === 'done' && (
                                                <span className="avatar avatar-sm rounded-circle bg-success text-white flex-shrink-0">
                                                    <i className="isax isax-tick-circle5" />
                                                </span>
                                            )}
                                            {step.state === 'current' && (
                                                <span className="avatar avatar-sm rounded-circle bg-primary text-white flex-shrink-0">
                                                    {step.number}
                                                </span>
                                            )}
                                            {step.state === 'upcoming' && (
                                                <span className="avatar avatar-sm rounded-circle bg-light text-gray-6 flex-shrink-0">
                                                    {step.number}
                                                </span>
                                            )}
                                            <span className={step.state === 'upcoming' ? 'fs-14 text-gray-6' : 'fs-14 fw-medium text-dark'}>
                                                {step.label}
                                            </span>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-8">
                            {/* Step 3: Documents */}
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="fs-18 mb-1">Step 3 — Supporting documents</h2>
                                    <p className="fs-13 text-gray-6 mb-0">
                                        {uploadedCount} of {documents.length} uploaded. PDF, JPG or PNG, up to 5 MB each.
                                    </p>
                                </div>
                                <div className="card-body">
                                    <div className="upload-drop mb-4" onDragOver={handleDragOver} onDrop={handleDrop}>
                                        <span className="avatar avatar-xl rounded-circle bg-primary-transparent text-primary mx-auto mb-2">
                                            <i className="isax isax-document-upload fs-24" />
                                        </span>
                                        <p className="fs-14 fw-medium text-dark mb-1">Drag files here, or browse</p>
                                        <p className="fs-13 text-gray-6 mb-3">
                                            We will match each file to the right requirement automatically.
                                        </p>
                                        <label className="btn btn-primary mb-0" htmlFor="visa-upload">
                                            Choose files
                                        </label>
                                        <input
                                            type="file"
                                            id="visa-upload"
                                            name="visa-upload"
                                            className="d-none"
                                            multiple
                                            accept={acceptedFileTypes}
                                            onChange={handleBrowse}
                                        />
                                    </div>
                                    {documents.map((doc, index) => (
                                        <div
                                            key={doc.id}
                                            className={`d-flex align-items-start justify-content-between gap-3 ${index > 0 ? 'border-top pt-3 mt-3' : ''}`}
                                        >
                                            <div>
                                                <div className="d-flex align-items-center gap-2 mb-1">
                                                    <p className="fs-14 fw-medium text-dark mb-0">{doc.title}</p>
                                                    <span className={`badge ${documentBadges[doc.status].className} fs-12`}>
                                                        {documentBadges[doc.status].label}
                                                    </span>
                                                </div>
                                                <p className="fs-13 text-gray-6 mb-1">{doc.requirement}</p>
                                                {doc.status === 'uploaded' && (
                                                    <p className="fs-13 text-gray-6 mb-0">
                                                        <i className="isax isax-document-text me-1" />
                                                        {doc.fileName} · {doc.fileSize}
                                                    </p>
                                                )}
                                                {doc.status === 'action' && doc.error && (
                                                    <p className="fs-13 text-danger mb-0">
                                                        <i className="isax isax-warning-2 me-1" />
                                                        {doc.error}
                                                    </p>
                                                )}
                                            </div>
                                            {doc.status === 'uploaded' && (
                                                <div className="d-flex align-items-center gap-2 flex-shrink-0">
                                                    <Link href="#" className="btn btn-light btn-sm" onClick={(e) => openReplacePicker(e, doc.id)}>
                                                        Replace
                                                    </Link>
                                                    <Link href="#" className="btn btn-light btn-sm text-danger" onClick={(e) => removeFile(e, doc.id)}>
                                                        <i className="isax isax-trash" />
                                                    </Link>
                                                </div>
                                            )}
                                            {doc.status === 'missing' && (
                                                <Link href="#" className="btn btn-light btn-sm flex-shrink-0" onClick={(e) => openReplacePicker(e, doc.id)}>
                                                    <i className="isax isax-document-upload me-1" />
                                                    Upload
                                                </Link>
                                            )}
                                            {doc.status === 'action' && (
                                                <Link href="#" className="btn btn-primary btn-sm flex-shrink-0" onClick={(e) => openReplacePicker(e, doc.id)}>
                                                    Re-upload
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                    <input
                                        type="file"
                                        ref={replaceInputRef}
                                        className="d-none"
                                        accept={acceptedFileTypes}
                                        onChange={handleReplaceFile}
                                    />
                                </div>
                            </div>

                            {/* Applicant recap */}
                            <div className="card mb-0">
                                <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                                    <h2 className="fs-18 mb-0">Applicant &amp; travel</h2>
                                    <Link href="#" className="btn btn-light btn-sm">Edit</Link>
                                </div>
                                <div className="card-body">
                                    <div className="row row-gap-3">
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="va-name">Full name, as in passport</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="va-name"
                                                name="va-name"
                                                defaultValue="Jeffrey Wilson"
                                                autoComplete="name"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="va-nationality">Nationality</label>
                                            <select
                                                className="form-control"
                                                id="va-nationality"
                                                name="va-nationality"
                                                autoComplete="country-name"
                                            >
                                                {nationalityOptions.map((option) => (
                                                    <option key={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="va-dob">Date of birth</label>
                                            <div className="input-icon-end position-relative">
                                                <DatePicker
                                                    className="form-control datetimepicker"
                                                    id="va-dob"
                                                    placeholder="dd/mm/yyyy"
                                                    defaultValue={new Date('1988-07-18')}
                                                    format="DD/MM/YYYY"
                                                />
                                                <span className="input-icon-addon">
                                                    <i className="isax isax-calendar" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="va-passport">Passport number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="va-passport"
                                                name="va-passport"
                                                defaultValue="P4000021"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="va-entry">Intended date of entry</label>
                                            <div className="input-icon-end position-relative">
                                                <DatePicker
                                                    className="form-control datetimepicker"
                                                    id="va-entry"
                                                    placeholder="dd/mm/yyyy"
                                                    defaultValue={new Date('2025-05-25')}
                                                    format="DD/MM/YYYY"
                                                />
                                                <span className="input-icon-addon">
                                                    <i className="isax isax-calendar" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="va-exit">Intended date of exit</label>
                                            <div className="input-icon-end position-relative">
                                                <DatePicker
                                                    className="form-control datetimepicker"
                                                    id="va-exit"
                                                    placeholder="dd/mm/yyyy"
                                                    defaultValue={new Date('2025-05-28')}
                                                    format="DD/MM/YYYY"
                                                />
                                                <span className="input-icon-addon">
                                                    <i className="isax isax-calendar" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label" htmlFor="va-purpose">Purpose of visit</label>
                                            <select className="form-control" id="va-purpose" name="va-purpose">
                                                {purposeOptions.map((option) => (
                                                    <option key={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 theiaStickySidebar">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="fs-16 mb-0">Your application</h3>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex align-items-center gap-2 mb-3">
                                        <span className="avatar avatar-lg rounded flex-shrink-0">
                                            <ImageWithBasePath src="assets/img/flags/es.png" className="rounded" alt="Flag of Spain" />
                                        </span>
                                        <div>
                                            <p className="fs-14 fw-medium text-dark mb-0">Spain — Schengen</p>
                                            <p className="fs-13 text-gray-6 mb-0">Short stay, up to 90 days</p>
                                        </div>
                                    </div>
                                    {applicationSummary.map((row) => (
                                        <div className="d-flex justify-content-between mb-2" key={row.label}>
                                            <span className="fs-14">{row.label}</span>
                                            <span className="fs-14 fw-medium text-dark">{row.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h3 className="fs-16 mb-0">Fees</h3>
                                </div>
                                <div className="card-body">
                                    {feeRows.map((row) => (
                                        <div className="d-flex justify-content-between mb-2" key={row.label}>
                                            <span className="fs-14">{row.label}</span>
                                            <span className="fs-14 fw-medium text-dark">{row.value}</span>
                                        </div>
                                    ))}
                                    <div className="d-flex justify-content-between border-top pt-3 mt-3">
                                        <span className="fs-16 fw-semibold text-dark">Total</span>
                                        <span className="fs-20 fw-semibold text-primary">€137.00</span>
                                    </div>
                                    <p className="fs-13 text-gray-6 mt-2 mb-0">
                                        Government fees are not refundable once the application is lodged, even if the visa is refused.
                                    </p>
                                </div>
                            </div>

                            <div className="card mb-0">
                                <div className="card-body">
                                    <button type="button" className="btn btn-primary w-100 mb-2" disabled={remainingCount > 0}>
                                        Continue to fees
                                    </button>
                                    <p className="fs-13 text-gray-6 text-center mb-2">
                                        {remainingCount > 0
                                            ? `${remainingCount} ${remainingCount === 1 ? 'document' : 'documents'} still required`
                                            : 'All documents uploaded'}
                                    </p>
                                    <Link href="#" className="btn btn-light w-100">Save and finish later</Link>
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

export default VisaApplication;
