import { getPageMetadata } from "@/config/metadata";
import ActivityListClient from "./activityListClient";

export const generateMetadata = () => getPageMetadata("Activity List");

export default function ActivityListPage() {
  return <ActivityListClient />;
}
