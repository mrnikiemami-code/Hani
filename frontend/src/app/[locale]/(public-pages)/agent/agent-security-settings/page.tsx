import { getPageMetadata } from "@/config/metadata";
import AgentSecuritySettingsClient from "./agentSecuritySettingsClient";

export const generateMetadata = () => getPageMetadata("Agent Security Settings");

export default function AgentSecuritySettingsPage() {
  return <AgentSecuritySettingsClient />;
}
