import { getPageMetadata } from "@/config/metadata";
import CruiseDetailsClient from "./cruiseDetailsClient";

export const generateMetadata = () => getPageMetadata("Cruise Details");

export default function CruiseDetailsPage() {
  return <CruiseDetailsClient />;
}
