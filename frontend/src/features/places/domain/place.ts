export type PlaceListItem = {
  placeId: string;
  slug: string;
  type: string;
  category: string;
  cuisine: string | null;
  priceBand: string | null;
  reservable: boolean;
  onlineReservable: boolean;
  latitude: number | null;
  longitude: number | null;
  name: string;
  amenityCount: number;
  averageRating: number | null;
  reviewCount: number;
  recommendationPercent: number | null;
  rankInCity: number | null;
};

export type PlaceListResult = {
  items: PlaceListItem[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export type PlaceDetail = PlaceListItem & {
  destinationId: string;
  translations: { locale: string; name: string; description: string | null }[];
  amenities: string[];
  menuItems: {
    section: string;
    name: string;
    description: string | null;
    price: number;
    currency: string;
    sortOrder: number;
  }[];
  mealPeriods: string[];
  dietaryOptions: string[];
  userPhotos: string[] | null;
};
