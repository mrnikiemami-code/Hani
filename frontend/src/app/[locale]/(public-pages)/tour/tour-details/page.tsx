import { getPageMetadata } from "@/config/metadata";
import TourDetailsClient from "./tourDetailsClient";

export const generateMetadata = () => getPageMetadata("Tour Details");

export default function TourDetailsPage() {
  return <TourDetailsClient />;
}
