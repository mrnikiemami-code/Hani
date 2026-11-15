import { getPageMetadata } from "@/config/metadata";
import VisaRequirementsClient from "./visaRequirementsClient";

export const generateMetadata = () => getPageMetadata("Visa Requirements");

export default function VisaRequirementsPage() {
  return <VisaRequirementsClient />;
}
