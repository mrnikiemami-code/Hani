import { getPageMetadata } from "@/config/metadata";
import AddVisaClient from "./addVisaClient";

export const generateMetadata = () => getPageMetadata("Add Visa");

export default function AddVisaPage() {
  return <AddVisaClient />;
}
