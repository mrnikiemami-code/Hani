import { getPageMetadata } from "@/config/metadata";
import DestinationClient from "./destinationClient";

export const generateMetadata = () => getPageMetadata("Destination");

export default function DestinationPage() {
  return <DestinationClient />;
}
