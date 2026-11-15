import { getPageMetadata } from "@/config/metadata";
import CustomerCarBookingClient from "./customerCarBookingClient";

export const generateMetadata = () => getPageMetadata("Customer Car Booking");

export default function CustomerCarBookingPage() {
  return <CustomerCarBookingClient />;
}
