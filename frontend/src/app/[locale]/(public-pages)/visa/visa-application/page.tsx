import { getPageMetadata } from "@/config/metadata";
import VisaApplicationClient from "./visaApplicationClient";

export const generateMetadata = () => getPageMetadata("Visa Application");

export default function VisaApplicationPage() {
  return <VisaApplicationClient />;
}
