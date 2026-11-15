import { getPageMetadata } from "@/config/metadata";
import ActivityBookingClient from "./activityBookingClient";

export const generateMetadata = () => getPageMetadata("Activity Booking");

export default function ActivityBookingPage() {
  return <ActivityBookingClient />;
}
