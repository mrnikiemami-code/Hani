import { getPageMetadata } from "@/config/metadata";
import ManageBookingClient from "./manageBookingClient";

export const generateMetadata = () => getPageMetadata("Manage Booking");

export default function ManageBookingPage() {
  return <ManageBookingClient />;
}
