import { getPageMetadata } from "@/config/metadata";
import CruiseBookingClient from "./cruiseBookingClient";

export const generateMetadata = () => getPageMetadata("Cruise Booking");

export default function CruiseBookingPage() {
  return <CruiseBookingClient />;
}
