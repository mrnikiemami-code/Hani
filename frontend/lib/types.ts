export type PagedResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export type CurrencyPrice = { currency: string; amount: number };

export type ProductSearchItem = {
  productId: string;
  slug: string;
  title: string;
  durationDays: number;
  tourType: string;
  minPrice: number | null;
  currency: string | null;
  offerCount: number;
  minPrices: CurrencyPrice[];
  difficulty: string;
  vehicleType: string;
  accommodationType: string;
  category: string;
  travelType: string;
};

export type VisaSummary = {
  countryId: string;
  slug: string;
  countryCode: string;
  name: string;
  typeCount: number;
  minimumPriceCurrency: string | null;
  minimumPrice: number | null;
};

export type TravelogueSummary = {
  travelogueId: string;
  slug: string;
  title: string;
  coverUrl: string | null;
  seriesName: string | null;
  publishedAt: string | null;
  viewCount: number;
  likeCount: number;
};

export type BlogSummary = {
  postId: string;
  slug: string;
  title: string;
  excerpt: string;
  coverUrl: string | null;
  publishedAt: string | null;
  viewCount: number;
  likeCount: number;
};

export type CampaignSummary = {
  campaignId: string;
  slug: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  status: string;
};

export type HomeFeed = {
  tours: PagedResult<ProductSearchItem>;
  visas: VisaSummary[];
  travelogues: PagedResult<TravelogueSummary>;
  blog: PagedResult<BlogSummary>;
  campaigns: PagedResult<CampaignSummary>;
};

export type HotelSummary = {
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

export type HotelDetail = {
  hotelId: string;
  slug: string;
  destinationId: string;
  stars: number;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  translations: { locale: string; name: string; description: string | null }[];
  amenities: { category: string; name: string }[];
  images: { url: string; caption: string | null; sortOrder: number }[];
  rooms: {
    name: string;
    roomType: string;
    mealPlan: string;
    adults: number;
    children: number;
    price: number | null;
    currency: string | null;
  }[];
  averageRating: number | null;
  reviewCount: number;
  recommendationPercent: number | null;
  rankInCity: number | null;
};

export type VisaType = {
  visaTypeId: string;
  code: string;
  entryType: string;
  issuanceType: string;
  processingDaysMin: number;
  processingDaysMax: number;
  validityDays: number;
  priceAdult: number;
  priceChild: number | null;
  currency: string;
  documents: { name: string; category: string }[];
  steps: string[];
  faqs: { question: string; answer: string }[];
  relatedArticleSlugs: string[];
};

export type VisaCountry = {
  countryId: string;
  slug: string;
  countryCode: string;
  name: string;
  description: string | null;
  types: VisaType[];
};

export type BlogDetail = BlogSummary & {
  locale: string;
  body: string;
  seoTitle: string | null;
  seoDescription: string | null;
  authorUserId: string;
  commentCount: number;
  destinationIds: string[] | null;
};

export type TravelogueDetail = TravelogueSummary & {
  locale: string;
  body: string;
  seoTitle: string | null;
  seoDescription: string | null;
  authorUserId: string;
  destinationIds: string[];
  commentCount: number;
};

export type VideoSummary = {
  videoId: string;
  slug: string;
  title: string;
  provider: string;
  coverUrl: string | null;
  durationSeconds: number;
  level: number;
  publishedAt: string | null;
  viewCount: number;
  likeCount: number;
};

export type VideoDetail = VideoSummary & {
  locale: string;
  description: string;
  seoTitle: string | null;
  seoDescription: string | null;
  videoUrl: string;
  authorUserId: string;
  commentCount: number;
};

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
    managerName: string | null;
    staffCount: number | null;
    address: string | null;
    averageRating: number | null;
    reviewCount: number;
  };
  approvedTourCount: number;
};

export type AuthorProfile = {
  author: {
    userId: string;
    username: string;
    displayName: string;
    bio: string | null;
    avatarUrl: string | null;
    memberSince: string;
  };
  content: { userId: string; blogs: number; travelogues: number; videos: number };
  gamification: {
    userId: string;
    points: number;
    level: number;
    travelStyle: string | null;
    badges: string[];
  };
  reviewCount: number;
};

export type ProductComparison = {
  productId: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  durationDays: number;
  offers: {
    offerId: string;
    agencyId: string;
    agencyName: string;
    title: string;
    minPrice: number;
    currency: string;
    minPrices: CurrencyPrice[];
    accommodationOptions: {
      optionId: string;
      hotelName: string;
      hotelStars: number;
      roomType: string;
      mealPlan: string;
      amount: number;
      currency: string;
      description: string | null;
    }[];
    flightOptions: {
      optionId: string;
      direction: string;
      airline: string;
      flightNumber: string;
      departureAirport: string;
      arrivalAirport: string;
      departureTime: string;
      arrivalTime: string;
      durationMinutes: number;
      cabin: string;
      baggageAllowance: string;
    }[];
    departures: {
      departureId: string;
      startDate: string;
      endDate: string;
      seatsLeft: number;
      status: string;
      prices: { roomType: string; amount: number; currency: string }[];
    }[];
    bookingMode: string;
    collectionMode: string;
  }[];
};

export type PlaceSummary = {
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

export type PlaceDetail = {
  placeId: string;
  slug: string;
  type: string;
  destinationId: string;
  category: string;
  cuisine: string | null;
  priceBand: string | null;
  reservable: boolean;
  onlineReservable: boolean;
  latitude: number | null;
  longitude: number | null;
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
  averageRating: number | null;
  reviewCount: number;
  recommendationPercent: number | null;
  rankInCity: number | null;
};

export type FlightRoute = {
  routeId: string;
  slug: string;
  originCode: string;
  destinationCode: string;
  originCity: string;
  destinationCity: string;
  offers: {
    flightNumber: string;
    airlineName: string;
    departureDate: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    currency: string;
    deepLink: string;
  }[];
};
