import { getPageMetadata } from "@/config/metadata";
import EditTourClient from "./editTourClient";

export const generateMetadata = () => getPageMetadata("Edit Tour");

export default function EditTourPage() {
  return <EditTourClient />;
}
