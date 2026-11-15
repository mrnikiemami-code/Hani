import { getPageMetadata } from "@/config/metadata";
import BusSeatSelectionClient from "./busSeatSelectionClient";

export const generateMetadata = () => getPageMetadata("Bus Seat Selection");

export default function BusSeatSelectionPage() {
  return <BusSeatSelectionClient />;
}
