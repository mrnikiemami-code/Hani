import { getPageMetadata } from "@/config/metadata";
import FlightSeatSelectionClient from "./flightSeatSelectionClient";

export const generateMetadata = () => getPageMetadata("Flight Seat Selection");

export default function FlightSeatSelectionPage() {
  return <FlightSeatSelectionClient />;
}
