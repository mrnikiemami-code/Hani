import { getPageMetadata } from "@/config/metadata";
import AgentSettingsClient from "./agentSettingsClient";

export const generateMetadata = () => getPageMetadata("Agent Settings");

export default function AgentSettingsPage() {
  return <AgentSettingsClient />;
}
