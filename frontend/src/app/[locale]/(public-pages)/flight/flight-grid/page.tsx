import { getPageMetadata } from "@/config/metadata";
import FlightGridClient from "./flightGridClient";

export const generateMetadata = () => getPageMetadata("Flight Grid");

export default function FlightGridPage() {
  return <FlightGridClient />;
}
