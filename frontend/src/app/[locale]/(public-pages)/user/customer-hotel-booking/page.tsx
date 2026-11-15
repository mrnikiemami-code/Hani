import { getPageMetadata } from "@/config/metadata";
import CustomerHotelBookingClient from "./customerHotelBookingClient";

export const generateMetadata = () => getPageMetadata("Customer Hotel Booking");

export default function CustomerHotelBookingPage() {
  return <CustomerHotelBookingClient />;
}
