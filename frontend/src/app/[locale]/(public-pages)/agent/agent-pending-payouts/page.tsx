import { getPageMetadata } from "@/config/metadata";
import AgentPendingPayoutsClient from "./agentPendingPayoutsClient";

export const generateMetadata = () => getPageMetadata("Agent Pending Payouts");

export default function AgentPendingPayoutsPage() {
  return <AgentPendingPayoutsClient />;
}
