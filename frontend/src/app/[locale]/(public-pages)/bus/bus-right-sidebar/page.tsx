import { getPageMetadata } from "@/config/metadata";
import BusRightSidebarClient from "./busRightSidebarClient";

export const generateMetadata = () => getPageMetadata("Bus Right Sidebar");

export default function BusRightSidebarPage() {
  return <BusRightSidebarClient />;
}
