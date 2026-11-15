import { getPageMetadata } from "@/config/metadata";
import AgentDashboardClient from "./agentDashboardClient";

export const generateMetadata = () => getPageMetadata("Agent Dashboard");

export default function AgentDashboardPage() {
  return <AgentDashboardClient />;
}
