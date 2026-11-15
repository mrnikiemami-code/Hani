import { getPageMetadata } from "@/config/metadata";
import HotelMapClient from "./hotelMapClient";

export const generateMetadata = () => getPageMetadata("Hotel Map");

export default function HotelMapPage() {
  return <HotelMapClient />;
}
