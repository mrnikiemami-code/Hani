export type TourScopeValue = "Domestic" | "Foreign";

export type TourSearchFilters = {
  scope?: TourScopeValue;
  originSlug?: string;
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  minDuration?: number;
  maxDuration?: number;
  tourType?: string;
  sort?: string;
};

export type TourSearchItem = {
  productId: string;
  slug: string;
  title: string;
  durationDays: number;
  tourType: string;
  minPrice: number | null;
  currency: string | null;
  offerCount: number;
  destinationNames: string[] | null;
  averageRating: number | null;
  reviewCount: number;
  agencyName: string | null;
  nextDepartureDate: string | null;
  scope?: TourScopeValue | null;
  coverImageUrl?: string | null;
};

export type PagedResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};
