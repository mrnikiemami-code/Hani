import { getPageMetadata } from "@/config/metadata";
import VisaBookingConfirmationClient from "./visaBookingConfirmationClient";

export const generateMetadata = () => getPageMetadata("Visa Booking Confirmation");

export default function VisaBookingConfirmationPage() {
  return <VisaBookingConfirmationClient />;
}
