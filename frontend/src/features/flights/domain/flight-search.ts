export type FlightOffer = {
  flightOfferId: string;
  flightNumber: string;
  airlineCode: string;
  airlineName: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  stops: number;
  cabin: string;
  baggageAllowance: string;
  price: number;
  currency: string;
  provider: string;
  deepLink: string;
};

export type FlightRoute = {
  routeId: string;
  slug: string;
  originCode: string;
  destinationCode: string;
  originCity: string;
  destinationCity: string;
  offers: FlightOffer[];
};

export type FlightReference = {
  airlines: { iata: string; name: string }[];
  airports: {
    iata: string;
    name: string;
    city: string;
    countryCode: string;
    latitude: number | null;
    longitude: number | null;
  }[];
};

export type FlightSearchFilters = {
  origin?: string;
  destination?: string;
  departureDate?: string;
  cabin?: string;
  airline?: string;
  maxStops?: number;
  minPrice?: number;
  maxPrice?: number;
};
