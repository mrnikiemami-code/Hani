import { getPageMetadata } from "@/config/metadata";
import AddCruiseClient from "./addCruiseClient";

export const generateMetadata = () => getPageMetadata("Add Cruise");

export default function AddCruisePage() {
  return <AddCruiseClient />;
}
