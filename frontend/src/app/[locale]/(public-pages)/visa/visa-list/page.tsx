import { getPageMetadata } from "@/config/metadata";
import VisaListClient from "./visaListClient";

export const generateMetadata = () => getPageMetadata("Visa List");

export default function VisaListPage() {
  return <VisaListClient />;
}
