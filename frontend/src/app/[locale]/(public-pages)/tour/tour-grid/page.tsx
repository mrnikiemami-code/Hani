import { getPageMetadata } from "@/config/metadata";
import TourGridClient from "./tourGridClient";

export const generateMetadata = () => getPageMetadata("Tour Grid");

export default function TourGridPage() {
  return <TourGridClient />;
}
