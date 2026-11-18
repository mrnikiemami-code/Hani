export type AdminHotelTranslation = {
  locale: string;
  name: string;
  description: string | null;
  policies: string | null;
};

export type AdminHotelImage = {
  url: string;
  caption: string | null;
  sortOrder: number;
  category: string | null;
  altText: string | null;
  isCover: boolean;
  source: string | null;
  mediaAssetId: string | null;
};

export type AdminHotelAmenity = {
  category: string;
  name: string;
  code: string | null;
  icon: string | null;
  sortOrder: number;
};

export type AdminHotelRoom = {
  name: string;
  roomType: string;
  mealPlan: string;
  adults: number;
  children: number;
  price: number;
  currency: string;
  description: string | null;
  sortOrder: number;
  inventory: number;
  maxOccupancy: number;
  roomSize: number | null;
  bedType: string | null;
  view: string | null;
  ratePlan: string | null;
  cancellationPolicy: string | null;
  taxPercent: number | null;
  stopSell: boolean;
};

export type AdminHotelDetail = {
  hotelId: string;
  slug: string;
  destinationId: string;
  stars: number;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  translations: AdminHotelTranslation[];
  amenities: AdminHotelAmenity[];
  images: AdminHotelImage[];
  rooms: AdminHotelRoom[];
  propertyType: string;
  contactPhone: string | null;
  websiteUrl: string | null;
  checkInTime: string | null;
  checkOutTime: string | null;
  status: string;
  seoTitle: string | null;
  seoDescription: string | null;
};
