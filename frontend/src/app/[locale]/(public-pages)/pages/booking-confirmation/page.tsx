import { getPageMetadata } from "@/config/metadata";
import BookingConfirmationClient from "./bookingConfirmationClient";

export const generateMetadata = () => getPageMetadata("Booking Confirmation");

export default function BookingConfirmationPage() {
  return <BookingConfirmationClient />;
}
