import { getPageMetadata } from "@/config/metadata";
import EditCruiseClient from "./editCruiseClient";

export const generateMetadata = () => getPageMetadata("Edit Cruise");

export default function EditCruisePage() {
  return <EditCruiseClient />;
}
