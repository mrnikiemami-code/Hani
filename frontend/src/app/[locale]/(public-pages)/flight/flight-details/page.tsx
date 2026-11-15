import { getPageMetadata } from "@/config/metadata";
import FlightDetailsClient from "./flightDetailsClient";

export const generateMetadata = () => getPageMetadata("Flight Details");

export default function FlightDetailsPage() {
  return <FlightDetailsClient />;
}
