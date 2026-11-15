import { getPageMetadata } from "@/config/metadata";
import TourBookingClient from "./tourBookingClient";

export const generateMetadata = () => getPageMetadata("Tour Booking");

export default function TourBookingPage() {
  return <TourBookingClient />;
}
