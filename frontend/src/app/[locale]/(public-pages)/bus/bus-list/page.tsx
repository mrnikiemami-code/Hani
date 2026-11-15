import { getPageMetadata } from "@/config/metadata";
import BusListClient from "./busListClient";

export const generateMetadata = () => getPageMetadata("Bus List");

export default function BusListPage() {
  return <BusListClient />;
}
