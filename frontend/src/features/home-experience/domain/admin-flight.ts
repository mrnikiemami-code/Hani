export type AdminFlightRoute = {
  routeId: string;
  slug: string;
  originCode: string;
  destinationCode: string;
  originCity: string;
  destinationCity: string;
  isActive: boolean;
  offerCount: number;
  minimumPrice: number | null;
  currency: string | null;
};

export type AdminFlightPage = {
  items: AdminFlightRoute[];
  page: number;
  pageSize: number;
  total: number;
};

export type AdminFlightReferences = {
  airlines: Array<{ iata: string; name: string }>;
  airports: Array<{ iata: string; name: string; city: string; countryCode: string }>;
};
