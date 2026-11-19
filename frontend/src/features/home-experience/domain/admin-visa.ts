export type AdminVisaCountry = {
  id: string;
  slug: string;
  countryCode: string;
  name: string;
  typeCount: number;
  minimumPrice: number | null;
  currency: string | null;
};

export type AdminVisaCountryPage = {
  items: AdminVisaCountry[];
  page: number;
  pageSize: number;
  total: number;
};

export type AdminVisaApplication = {
  id: string;
  applicationNumber: string;
  applicantName: string;
  passportNo: string;
  nationality: string;
  contactEmail: string;
  status: string;
  travelDate: string | null;
  createdAt: string;
};

export type AdminVisaApplicationPage = {
  items: AdminVisaApplication[];
  page: number;
  pageSize: number;
  total: number;
};
