import { getPageMetadata } from "@/config/metadata";
import FlightListClient from "./flightListClient";

export const generateMetadata = () => getPageMetadata("Flight List");

export default function FlightListPage() {
  return <FlightListClient />;
}
