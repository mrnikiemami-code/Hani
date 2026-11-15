import { getPageMetadata } from "@/config/metadata";
import CruiseGridClient from "./cruiseGridClient";

export const generateMetadata = () => getPageMetadata("Cruise Grid");

export default function CruiseGridPage() {
  return <CruiseGridClient />;
}
