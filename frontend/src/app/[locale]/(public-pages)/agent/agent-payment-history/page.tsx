import { getPageMetadata } from "@/config/metadata";
import AgentPaymentHistoryClient from "./agentPaymentHistoryClient";

export const generateMetadata = () => getPageMetadata("Agent Payment History");

export default function AgentPaymentHistoryPage() {
  return <AgentPaymentHistoryClient />;
}
