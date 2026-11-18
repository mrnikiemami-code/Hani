export type AdminAgencyDocument = {
  documentId: string;
  type: string;
  fileUrl: string;
  status: string;
  uploadedAt: string;
};

export type AdminAgencyDetail = {
  id: string;
  slug: string;
  name: string;
  licenseNo: string;
  city: string;
  status: string;
  subscriptionValidUntil: string | null;
  createdAt: string;
  ownerUserId: string | null;
  website: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  about: string | null;
  submittedAt: string | null;
  reviewedAt: string | null;
  rejectionReason: string | null;
  documents: AdminAgencyDocument[];
  licenseType: string | null;
  licenseIssuedAt: string | null;
  managerName: string | null;
  staffCount: number | null;
  address: string | null;
  province: string | null;
  licenseFileUrl: string | null;
};
