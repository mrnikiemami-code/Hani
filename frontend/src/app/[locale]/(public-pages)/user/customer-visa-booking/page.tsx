import { getPageMetadata } from "@/config/metadata";
import CustomerVisaBookingClient from "./customerVisaBookingClient";

export const generateMetadata = () => getPageMetadata("Customer Visa Booking");

export default function CustomerVisaBookingPage() {
  return <CustomerVisaBookingClient />;
}
