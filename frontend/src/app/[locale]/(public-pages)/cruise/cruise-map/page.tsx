import { getPageMetadata } from "@/config/metadata";
import CruiseMapClient from "./cruiseMapClient";

export const generateMetadata = () => getPageMetadata("Cruise Map");

export default function CruiseMapPage() {
  return <CruiseMapClient />;
}
