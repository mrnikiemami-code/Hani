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

export type AdminVisaType = {
  id: string;
  code: string;
  entryType: string;
  issuanceType: string;
  processingDaysMin: number;
  processingDaysMax: number;
  validityDays: number;
  priceAdult: number;
  priceChild: number | null;
  currency: string;
};

export type AdminVisaCountryDetail = {
  id: string;
  slug: string;
  countryCode: string;
  coverImageUrl: string | null;
  translations: Array<{
    locale: string;
    name: string;
    description: string | null;
  }>;
  types: AdminVisaType[];
};

export type AdminVisaCountryUpdateInput = {
  countryCode: string;
  coverImageUrl: string | null;
  translations: Array<{
    locale: string;
    name: string;
    description: string | null;
  }>;
  types: Array<{
    id: string | null;
    code: string;
    entryType: string;
    issuanceType: string;
    processingDaysMin: number;
    processingDaysMax: number;
    validityDays: number;
    priceAdult: number;
    priceChild: number | null;
    currency: string;
  }>;
};
