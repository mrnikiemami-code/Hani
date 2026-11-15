import { getPageMetadata } from "@/config/metadata";
import EditHotelClient from "./editHotelClient";

export const generateMetadata = () => getPageMetadata("Edit Hotel");

export default function EditHotelPage() {
  return <EditHotelClient />;
}
