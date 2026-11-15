import { getPageMetadata } from "@/config/metadata";
import HotelDetailsClient from "./hotelDetailsClient";

export const generateMetadata = () => getPageMetadata("Hotel Details");

export default function HotelDetailsPage() {
  return <HotelDetailsClient />;
}
