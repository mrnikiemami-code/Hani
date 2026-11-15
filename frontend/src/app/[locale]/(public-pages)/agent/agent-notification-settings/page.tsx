import { getPageMetadata } from "@/config/metadata";
import AgentNotificationSettingsClient from "./agentNotificationSettingsClient";

export const generateMetadata = () => getPageMetadata("Agent Notification Settings");

export default function AgentNotificationSettingsPage() {
  return <AgentNotificationSettingsClient />;
}
