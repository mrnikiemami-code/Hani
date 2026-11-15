export type HotelSearchItem = {
  hotelId: string;
  slug: string;
  stars: number;
  address: string | null;
  name: string;
  amenityCount: number;
  averageRating: number | null;
  reviewCount: number;
  recommendationPercent: number | null;
  rankInCity: number | null;
  destinationId: string;
};

export type HotelPagedResult = {
  items: HotelSearchItem[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};
