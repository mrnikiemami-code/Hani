import { getPageMetadata } from "@/config/metadata";
import CruiseBookingConfirmationClient from "./cruiseBookingConfirmationClient";

export const generateMetadata = () => getPageMetadata("Cruise Booking Confirmation");

export default function CruiseBookingConfirmationPage() {
  return <CruiseBookingConfirmationClient />;
}
