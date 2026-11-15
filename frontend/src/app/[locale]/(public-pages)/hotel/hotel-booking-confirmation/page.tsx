import { getPageMetadata } from "@/config/metadata";
import HotelBookingConfirmationClient from "./hotelBookingConfirmationClient";

export const generateMetadata = () => getPageMetadata("Hotel Booking Confirmation");

export default function HotelBookingConfirmationPage() {
  return <HotelBookingConfirmationClient />;
}
