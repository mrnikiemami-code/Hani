import { getPageMetadata } from "@/config/metadata";
import HotelBookingClient from "./hotelBookingClient";

export const generateMetadata = () => getPageMetadata("Hotel Booking");

export default function HotelBookingPage() {
  return <HotelBookingClient />;
}
