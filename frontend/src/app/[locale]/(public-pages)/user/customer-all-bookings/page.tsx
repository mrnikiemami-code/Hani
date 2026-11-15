import { getPageMetadata } from "@/config/metadata";
import CustomerAllBookingsClient from "./customerAllBookingsClient";

export const generateMetadata = () => getPageMetadata("Customer All Bookings");

export default function CustomerAllBookingsPage() {
  return <CustomerAllBookingsClient />;
}
