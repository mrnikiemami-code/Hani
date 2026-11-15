import { getPageMetadata } from "@/config/metadata";
import FlightBookingClient from "./flightBookingClient";

export const generateMetadata = () => getPageMetadata("Flight Booking");

export default function FlightBookingPage() {
  return <FlightBookingClient />;
}
