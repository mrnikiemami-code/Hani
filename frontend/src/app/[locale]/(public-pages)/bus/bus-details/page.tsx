import { getPageMetadata } from "@/config/metadata";
import BusDetailsClient from "./busDetailsClient";

export const generateMetadata = () => getPageMetadata("Bus Details");

export default function BusDetailsPage() {
  return <BusDetailsClient />;
}
