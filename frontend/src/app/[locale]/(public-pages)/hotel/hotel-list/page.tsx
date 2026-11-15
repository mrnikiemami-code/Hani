import { getPageMetadata } from "@/config/metadata";
import HotelListClient from "./hotelListClient";

export const generateMetadata = () => getPageMetadata("Hotel List");

export default function HotelListPage() {
  return <HotelListClient />;
}
