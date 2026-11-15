import { getPageMetadata } from "@/config/metadata";
import BusBookingConfirmationClient from "./busBookingConfirmationClient";

export const generateMetadata = () => getPageMetadata("Bus Booking Confirmation");

export default function BusBookingConfirmationPage() {
  return <BusBookingConfirmationClient />;
}
