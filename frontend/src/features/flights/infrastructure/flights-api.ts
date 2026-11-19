import { apiGet } from "@/lib/hani/api";
import type {
  FlightReference,
  FlightRoute,
  FlightSearchFilters
} from "../domain/flight-search";

function queryString(filters: FlightSearchFilters): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && String(value).length > 0) {
      query.set(key, String(value));
    }
  }
  return query.toString();
}

export async function searchFlights(
  filters: FlightSearchFilters = {}
): Promise<FlightRoute[]> {
  const query = queryString(filters);
  const result = await apiGet<FlightRoute[]>(
    `/market/v1/flights/search${query ? `?${query}` : ""}`
  );
  return result ?? [];
}

export async function getFlightRoute(slug: string): Promise<FlightRoute | null> {
  return apiGet<FlightRoute>(
    `/market/v1/flights/routes/${encodeURIComponent(slug)}`
  );
}

export async function getFlightReferences(): Promise<FlightReference> {
  const result = await apiGet<FlightReference>("/market/v1/flights/references");
  return result ?? { airlines: [], airports: [] };
}

export function flightAirports(routes: FlightRoute[]) {
  const map = new Map<string, { code: string; city: string }>();
  for (const route of routes) {
    map.set(route.originCode, {
      code: route.originCode,
      city: route.originCity
    });
    map.set(route.destinationCode, {
      code: route.destinationCode,
      city: route.destinationCity
    });
  }
  return [...map.values()].sort((a, b) => a.code.localeCompare(b.code));
}

export function flightCabinOptions(routes: FlightRoute[]): string[] {
  return [
    ...new Set(
      routes.flatMap((route) => route.offers.map((offer) => offer.cabin))
    )
  ].sort();
}

export function routeOffers(routes: FlightRoute[]) {
  return routes.flatMap((route) =>
    route.offers.map((offer) => ({ route, offer }))
  );
}
