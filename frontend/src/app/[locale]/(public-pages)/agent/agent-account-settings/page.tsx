import { getPageMetadata } from "@/config/metadata";
import AgentAccountSettingsClient from "./agentAccountSettingsClient";

export const generateMetadata = () => getPageMetadata("Agent Account Settings");

export default function AgentAccountSettingsPage() {
  return <AgentAccountSettingsClient />;
}
