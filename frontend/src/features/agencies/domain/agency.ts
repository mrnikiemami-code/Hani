export type AgencyDirectoryItem = {
  id: string;
  slug: string;
  name: string;
  city: string;
  province: string | null;
  licenseType: string | null;
  memberSince: string;
  averageRating: number | null;
  reviewCount: number;
  approvedTourCount: number;
};

export type AgencyDirectoryPage = {
  items: AgencyDirectoryItem[];
  page: number;
  pageSize: number;
  totalCount: number;
};

export type AgencyProfile = {
  agency: {
    id: string;
    slug: string;
    name: string;
    city: string;
    province: string | null;
    website: string | null;
    contactEmail: string | null;
    contactPhone: string | null;
    about: string | null;
    memberSince: string;
    licenseNo: string;
    licenseType: string | null;
    licenseIssuedAt: string | null;
    managerName: string | null;
    staffCount: number | null;
    address: string | null;
    licenseFileUrl: string | null;
    averageRating: number | null;
    reviewCount: number;
  };
  approvedTourCount: number;
};
