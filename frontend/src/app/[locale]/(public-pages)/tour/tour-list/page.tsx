import { getPageMetadata } from "@/config/metadata";
import TourListClient from "./tourListClient";

export const generateMetadata = () => getPageMetadata("Tour List");

export default function TourListPage() {
  return <TourListClient />;
}
