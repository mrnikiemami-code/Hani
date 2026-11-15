import { getPageMetadata } from "@/config/metadata";
import AgentPlansSettingsClient from "./agentPlansSettingsClient";

export const generateMetadata = () => getPageMetadata("Agent Plans Settings");

export default function AgentPlansSettingsPage() {
  return <AgentPlansSettingsClient />;
}
