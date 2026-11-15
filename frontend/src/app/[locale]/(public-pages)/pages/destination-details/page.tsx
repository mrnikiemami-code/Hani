import { getPageMetadata } from "@/config/metadata";
import DestinationDetailsClient from "./destinationDetailsClient";

export const generateMetadata = () => getPageMetadata("Destination Details");

export default function DestinationDetailsPage() {
  return <DestinationDetailsClient />;
}
