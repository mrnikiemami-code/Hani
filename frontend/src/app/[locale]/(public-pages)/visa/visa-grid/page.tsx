import { getPageMetadata } from "@/config/metadata";
import VisaGridClient from "./visaGridClient";

export const generateMetadata = () => getPageMetadata("Visa Grid");

export default function VisaGridPage() {
  return <VisaGridClient />;
}
