import { getPageMetadata } from "@/config/metadata";
import VisaDetailsClient from "./visaDetailsClient";

export const generateMetadata = () => getPageMetadata("Visa Details");

export default function VisaDetailsPage() {
  return <VisaDetailsClient />;
}
