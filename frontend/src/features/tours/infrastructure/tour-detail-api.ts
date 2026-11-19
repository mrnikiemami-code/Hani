import { apiGet } from "@/lib/hani/api";

export type TourTranslation = {
  locale: string;
  title: string;
  summary: string;
  description: string;
  seoTitle: string | null;
  seoDescription: string | null;
  mealsSummary: string | null;
  includedServices: string | null;
  excludedServices: string | null;
  cancellationPolicy: string | null;
  additionalInfo: string | null;
  requiredItems: string | null;
};

export type TourItineraryDay = {
  dayNumber: number;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  translations: {
    locale: string;
    title: string;
    description: string;
    accommodation: string | null;
  }[];
};

export type TourProductDetail = {
  id: string;
  slug: string;
  durationDays: number;
  tourType: string;
  status: string;
  originDestinationId: string | null;
  difficulty: string;
  vehicleType: string;
  localVehicleType: string;
  accommodationType: string;
  category: string;
  travelType: string;
  createdAt: string;
  translations: TourTranslation[];
  destinationIds: string[];
  itineraryDays: TourItineraryDay[];
  scope: string;
  coverImageUrl: string | null;
};

export type TourOffer = {
  offerId: string;
  agencyId: string;
  agencyName: string;
  title: string;
  minPrice: number;
  currency: string;
  minPrices: { currency: string; amount: number }[];
  departures: {
    id: string;
    startDate: string;
    endDate: string;
    seatsLeft: number;
    prices: { roomType: string; currency: string; amount: number }[];
  }[];
  bookingMode: string;
};

export type TourComparison = {
  productId: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  durationDays: number;
  offers: TourOffer[];
};

export function getTourBySlug(locale: string, slug: string) {
  return apiGet<TourProductDetail>(
    `/market/v1/products/by-slug/${encodeURIComponent(slug)}`
  );
}

export function getTourComparison(productId: string, locale: string) {
  return apiGet<TourComparison>(
    `/market/v1/products/${encodeURIComponent(productId)}/compare?locale=${encodeURIComponent(locale)}`
  );
}

export function localizedTranslation(
  translations: TourTranslation[],
  locale: string
): TourTranslation | null {
  return (
    translations.find((item) => item.locale === locale) ??
    translations.find((item) => item.locale === "fa") ??
    translations.find((item) => item.locale === "en") ??
    translations[0] ??
    null
  );
}
