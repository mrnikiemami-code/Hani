import { getPageMetadata } from "@/config/metadata";
import AgentCommissionSummaryClient from "./agentCommissionSummaryClient";

export const generateMetadata = () => getPageMetadata("Agent Commission Summary");

export default function AgentCommissionSummaryPage() {
  return <AgentCommissionSummaryClient />;
}
