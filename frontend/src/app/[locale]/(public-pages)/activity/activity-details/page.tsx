import { getPageMetadata } from "@/config/metadata";
import ActivityDetailsClient from "./activityDetailsClient";

export const generateMetadata = () => getPageMetadata("Activity Details");

export default function ActivityDetailsPage() {
  return <ActivityDetailsClient />;
}
