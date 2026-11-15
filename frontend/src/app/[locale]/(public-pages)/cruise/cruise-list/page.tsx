import { getPageMetadata } from "@/config/metadata";
import CruiseListClient from "./cruiseListClient";

export const generateMetadata = () => getPageMetadata("Cruise List");

export default function CruiseListPage() {
  return <CruiseListClient />;
}
