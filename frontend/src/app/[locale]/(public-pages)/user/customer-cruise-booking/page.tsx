import { getPageMetadata } from "@/config/metadata";
import CustomerCruiseBookingClient from "./customerCruiseBookingClient";

export const generateMetadata = () => getPageMetadata("Customer Cruise Booking");

export default function CustomerCruiseBookingPage() {
  return <CustomerCruiseBookingClient />;
}
