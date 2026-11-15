import { getPageMetadata } from "@/config/metadata";
import BusBookingClient from "./busBookingClient";

export const generateMetadata = () => getPageMetadata("Bus Booking");

export default function BusBookingPage() {
  return <BusBookingClient />;
}
