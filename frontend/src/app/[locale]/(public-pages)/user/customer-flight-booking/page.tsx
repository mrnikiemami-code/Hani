import { getPageMetadata } from "@/config/metadata";
import CustomerFlightBookingClient from "./customerFlightBookingClient";

export const generateMetadata = () => getPageMetadata("Customer Flight Booking");

export default function CustomerFlightBookingPage() {
  return <CustomerFlightBookingClient />;
}
