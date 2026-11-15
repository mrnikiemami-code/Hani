import { getPageMetadata } from "@/config/metadata";
import IntegrationSettingsClient from "./integrationSettingsClient";

export const generateMetadata = () => getPageMetadata("Integration Settings");

export default function IntegrationSettingsPage() {
  return <IntegrationSettingsClient />;
}
