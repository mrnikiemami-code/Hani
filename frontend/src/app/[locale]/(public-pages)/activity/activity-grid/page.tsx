import { getPageMetadata } from "@/config/metadata";
import ActivityGridClient from "./activityGridClient";

export const generateMetadata = () => getPageMetadata("Activity Grid");

export default function ActivityGridPage() {
  return <ActivityGridClient />;
}
