import { getPageMetadata } from "@/config/metadata";
import ActivityMapClient from "./activityMapClient";

export const generateMetadata = () => getPageMetadata("Activity Map");

export default function ActivityMapPage() {
  return <ActivityMapClient />;
}
