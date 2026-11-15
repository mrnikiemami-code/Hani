import { getPageMetadata } from "@/config/metadata";
import VisaBookingDetailsClient from "./visaBookingDetailsClient";

export const generateMetadata = () => getPageMetadata("Visa Booking Details");

export default function VisaBookingDetailsPage() {
  return <VisaBookingDetailsClient />;
}
