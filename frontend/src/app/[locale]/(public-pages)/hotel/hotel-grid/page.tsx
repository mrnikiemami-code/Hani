import { getPageMetadata } from "@/config/metadata";
import HotelGridClient from "./hotelGridClient";

export const generateMetadata = () => getPageMetadata("Hotel Grid");

export default function HotelGridPage() {
  return <HotelGridClient />;
}
