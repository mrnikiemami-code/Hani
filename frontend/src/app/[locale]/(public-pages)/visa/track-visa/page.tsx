import { getPageMetadata } from "@/config/metadata";
import TrackVisaClient from "./trackVisaClient";

export const generateMetadata = () => getPageMetadata("Track Visa");

export default function TrackVisaPage() {
  return <TrackVisaClient />;
}
