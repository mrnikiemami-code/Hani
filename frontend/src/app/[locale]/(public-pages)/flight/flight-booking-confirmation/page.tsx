import { getPageMetadata } from "@/config/metadata";
import FlightBookingConfirmationClient from "./flightBookingConfirmationClient";

export const generateMetadata = () => getPageMetadata("Flight Booking Confirmation");

export default function FlightBookingConfirmationPage() {
  return <FlightBookingConfirmationClient />;
}
