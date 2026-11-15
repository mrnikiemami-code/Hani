import { getPageMetadata } from "@/config/metadata";
import CustomerTourBookingClient from "./customerTourBookingClient";

export const generateMetadata = () => getPageMetadata("Customer Tour Booking");

export default function CustomerTourBookingPage() {
  return <CustomerTourBookingClient />;
}
