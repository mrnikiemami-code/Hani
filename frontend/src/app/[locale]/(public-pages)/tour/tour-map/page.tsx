import { getPageMetadata } from "@/config/metadata";
import TourMapClient from "./tourMapClient";

export const generateMetadata = () => getPageMetadata("Tour Map");

export default function TourMapPage() {
  return <TourMapClient />;
}
