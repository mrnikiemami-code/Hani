import { getPageMetadata } from "@/config/metadata";
import DashboardClient from "./dashboardClient";

export const generateMetadata = () => getPageMetadata("Dashboard");

export default function DashboardPage() {
  return <DashboardClient />;
}
