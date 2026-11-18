export type AdminHotel = {
  id: string;
  slug: string;
  stars: number;
  address: string | null;
  name: string;
  destinationId: string;
  roomCount: number;
  imageCount: number;
  amenityCount: number;
  createdAt: string;
};

export type AdminHotelListResponse = {
  items: AdminHotel[];
  page: number;
  pageSize: number;
  total: number;
};
