import { getPageMetadata } from "@/config/metadata";
import EditCarClient from "./editCarClient";

export const generateMetadata = () => getPageMetadata("Edit Car");

export default function EditCarPage() {
  return <EditCarClient />;
}
