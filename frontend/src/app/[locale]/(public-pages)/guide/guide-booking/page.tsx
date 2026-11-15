import { getPageMetadata } from "@/config/metadata";
import GuideBookingClient from "./guideBookingClient";

export const generateMetadata = () => getPageMetadata("Guide Booking");

export default function GuideBookingPage() {
  return <GuideBookingClient />;
}
