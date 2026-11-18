export type AdminAgency = {
  id: string;
  slug: string;
  name: string;
  licenseNo: string;
  city: string;
  status: string;
  subscriptionValidUntil: string | null;
  createdAt: string;
  ownerUserId: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  submittedAt: string | null;
  reviewedAt: string | null;
};
