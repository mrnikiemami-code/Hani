import { getPageMetadata } from "@/config/metadata";
import ActivityBookingConfirmationClient from "./activityBookingConfirmationClient";

export const generateMetadata = () => getPageMetadata("Activity Booking Confirmation");

export default function ActivityBookingConfirmationPage() {
  return <ActivityBookingConfirmationClient />;
}
