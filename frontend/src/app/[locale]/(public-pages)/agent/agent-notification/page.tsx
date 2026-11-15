import { getPageMetadata } from "@/config/metadata";
import AgentNotificationClient from "./agentNotificationClient";

export const generateMetadata = () => getPageMetadata("Agent Notification");

export default function AgentNotificationPage() {
  return <AgentNotificationClient />;
}
