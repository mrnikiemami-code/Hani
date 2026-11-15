import { getPageMetadata } from "@/config/metadata";
import UnderMaintenanceClient from "./underMaintenanceClient";

export const generateMetadata = () => getPageMetadata("Under Maintenance");

export default function UnderMaintenancePage() {
  return <UnderMaintenanceClient />;
}
