import { getPageMetadata } from "@/config/metadata";
import CarBookingConfirmationClient from "./carBookingConfirmationClient";

export const generateMetadata = () => getPageMetadata("Car Booking Confirmation");

export default function CarBookingConfirmationPage() {
  return <CarBookingConfirmationClient />;
}
