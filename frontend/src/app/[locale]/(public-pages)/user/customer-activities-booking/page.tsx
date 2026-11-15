import { getPageMetadata } from "@/config/metadata";
import CustomerActivitiesBookingClient from "./customerActivitiesBookingClient";

export const generateMetadata = () => getPageMetadata("Customer Activities Booking");

export default function CustomerActivitiesBookingPage() {
  return <CustomerActivitiesBookingClient />;
}
