import { getPageMetadata } from "@/config/metadata";
import EditFlightClient from "./editFlightClient";

export const generateMetadata = () => getPageMetadata("Edit Flight");

export default function EditFlightPage() {
  return <EditFlightClient />;
}
