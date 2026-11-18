import { apiGet } from "@/lib/hani/api";

export type HotelDetailTranslation = {
  locale: string;
  name: string;
  description: string | null;
  policies: string | null;
};

export type HotelDetailImage = {
  url: string;
  caption: string | null;
  sortOrder: number;
  category: string | null;
  altText: string | null;
  isCover: boolean;
  source: string | null;
  mediaAssetId: string | null;
};

export type HotelDetailAmenity = {
  category: string;
  name: string;
  code: string | null;
  icon: string | null;
  sortOrder: number;
};
export type HotelDetailRoom = {
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

export type HotelDetail = {
  hotelId: string;
  slug: string;
  destinationId: string;
  stars: number;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  translations: HotelDetailTranslation[];
  amenities: HotelDetailAmenity[];
  images: HotelDetailImage[];
  rooms: HotelDetailRoom[];
  averageRating: number | null;
  reviewCount: number;
  recommendationPercent: number | null;
  rankInCity: number | null;
  userPhotos: string[] | null;
  propertyType: string | null;
  contactPhone: string | null;
  websiteUrl: string | null;
  checkInTime: string | null;
  checkOutTime: string | null;
  status: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

export type HotelReview = {
  reviewId: string;
  authorDisplayName: string;
  rating: number;
  foodRating: number | null;
  cleanlinessRating: number | null;
  staffRating: number | null;
  entertainmentRating: number | null;
  locationRating: number | null;
  valueRating: number | null;
  title: string | null;
  comment: string;
  travelType: string;
  visitDate: string | null;
  helpfulCount: number;
  createdAt: string;
  photos: { photoId: string; url: string; caption: string | null }[];
};

export type HotelReviewPage = {
  items: HotelReview[];
  totalCount: number;
};

export type HotelReviewCriteria = {
  targetId: string;
  targetType: string;
  reviewCount: number;
  averages: Record<string, number>;
};

export async function getHotelDetail(
  locale: string,
  slug: string
): Promise<HotelDetail | null> {
  return apiGet<HotelDetail>(
    `/market/v1/hotels/${encodeURIComponent(slug)}?locale=${encodeURIComponent(locale)}`
  );
}

export async function getHotelReviews(
  hotelId: string,
  pageSize = 10
): Promise<HotelReviewPage | null> {
  return apiGet<HotelReviewPage>(
    `/market/v1/reviews?targetType=Hotel&targetId=${hotelId}&page=1&pageSize=${pageSize}`
  );
}

export async function getHotelReviewCriteria(
  hotelId: string
): Promise<HotelReviewCriteria | null> {
  return apiGet<HotelReviewCriteria>(
    `/market/v1/reviews/criteria?targetType=Hotel&targetId=${hotelId}`
  );
}
