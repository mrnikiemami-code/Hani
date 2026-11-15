import { getPageMetadata } from "@/config/metadata";
import CarBookingClient from "./carBookingClient";

export const generateMetadata = () => getPageMetadata("Car Booking");

export default function CarBookingPage() {
  return <CarBookingClient />;
}
