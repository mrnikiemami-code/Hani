import { getPageMetadata } from "@/config/metadata";
import AddHotelClient from "./addHotelClient";

export const generateMetadata = () => getPageMetadata("Add Hotel");

export default function AddHotelPage() {
  return <AddHotelClient />;
}
