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
};

export type PagedResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};
