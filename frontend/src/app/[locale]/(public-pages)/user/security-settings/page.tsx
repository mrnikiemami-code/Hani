import { getPageMetadata } from "@/config/metadata";
import SecuritySettingsClient from "./securitySettingsClient";

export const generateMetadata = () => getPageMetadata("Security Settings");

export default function SecuritySettingsPage() {
  return <SecuritySettingsClient />;
}
