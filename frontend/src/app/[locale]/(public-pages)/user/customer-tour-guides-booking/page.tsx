import { getPageMetadata } from "@/config/metadata";
import CustomerTourGuidesBookingClient from "./customerTourGuidesBookingClient";

export const generateMetadata = () => getPageMetadata("Customer Tour Guides Booking");

export default function CustomerTourGuidesBookingPage() {
  return <CustomerTourGuidesBookingClient />;
}
