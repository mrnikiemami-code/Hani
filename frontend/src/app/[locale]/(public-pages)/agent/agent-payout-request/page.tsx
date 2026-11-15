import { getPageMetadata } from "@/config/metadata";
import AgentPayoutRequestClient from "./agentPayoutRequestClient";

export const generateMetadata = () => getPageMetadata("Agent Payout Request");

export default function AgentPayoutRequestPage() {
  return <AgentPayoutRequestClient />;
}
