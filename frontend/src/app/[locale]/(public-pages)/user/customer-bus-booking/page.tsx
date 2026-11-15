import { getPageMetadata } from "@/config/metadata";
import CustomerBusBookingClient from "./customerBusBookingClient";

export const generateMetadata = () => getPageMetadata("Customer Bus Booking");

export default function CustomerBusBookingPage() {
  return <CustomerBusBookingClient />;
}
