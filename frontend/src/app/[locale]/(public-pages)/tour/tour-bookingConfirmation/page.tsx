import { getPageMetadata } from "@/config/metadata";
import TourBookingConfirmationClient from "./tourBookingConfirmationClient";

export const generateMetadata = () => getPageMetadata("Tour BookingConfirmation");

export default function TourBookingConfirmationPage() {
  return <TourBookingConfirmationClient />;
}
