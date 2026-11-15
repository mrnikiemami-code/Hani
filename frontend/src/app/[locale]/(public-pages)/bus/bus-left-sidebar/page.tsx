import { getPageMetadata } from "@/config/metadata";
import BusLeftSidebarClient from "./busLeftSidebarClient";

export const generateMetadata = () => getPageMetadata("Bus Left Sidebar");

export default function BusLeftSidebarPage() {
  return <BusLeftSidebarClient />;
}
