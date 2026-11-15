import { getPageMetadata } from "@/config/metadata";
import AddBusClient from "./addBusClient";

export const generateMetadata = () => getPageMetadata("Add Bus");

export default function AddBusPage() {
  return <AddBusClient />;
}
