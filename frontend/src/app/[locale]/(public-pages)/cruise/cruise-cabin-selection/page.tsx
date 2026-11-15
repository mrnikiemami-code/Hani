import { getPageMetadata } from "@/config/metadata";
import CruiseCabinSelectionClient from "./cruiseCabinSelectionClient";

export const generateMetadata = () => getPageMetadata("Cruise Cabin Selection");

export default function CruiseCabinSelectionPage() {
  return <CruiseCabinSelectionClient />;
}
