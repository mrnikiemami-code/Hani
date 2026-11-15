import { getPageMetadata } from "@/config/metadata";
import HotelRoomSelectionClient from "./hotelRoomSelectionClient";

export const generateMetadata = () => getPageMetadata("Hotel Room Selection");

export default function HotelRoomSelectionPage() {
  return <HotelRoomSelectionClient />;
}
