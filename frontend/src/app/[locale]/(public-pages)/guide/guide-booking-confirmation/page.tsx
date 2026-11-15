import { getPageMetadata } from "@/config/metadata";
import GuideBookingConfirmationClient from "./guideBookingConfirmationClient";

export const generateMetadata = () => getPageMetadata("Guide Booking Confirmation");

export default function GuideBookingConfirmationPage() {
  return <GuideBookingConfirmationClient />;
}
