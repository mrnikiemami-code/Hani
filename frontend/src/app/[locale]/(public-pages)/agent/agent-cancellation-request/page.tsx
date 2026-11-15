import { getPageMetadata } from "@/config/metadata";
import AgentCancellationRequestClient from "./agentCancellationRequestClient";

export const generateMetadata = () => getPageMetadata("Agent Cancellation Request");

export default function AgentCancellationRequestPage() {
  return <AgentCancellationRequestClient />;
}
