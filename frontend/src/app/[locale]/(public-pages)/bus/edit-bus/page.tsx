import { getPageMetadata } from "@/config/metadata";
import EditBusClient from "./editBusClient";

export const generateMetadata = () => getPageMetadata("Edit Bus");

export default function EditBusPage() {
  return <EditBusClient />;
}
