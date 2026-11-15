import { getPageMetadata } from "@/config/metadata";
import AgentEarningsClient from "./agentEarningsClient";

export const generateMetadata = () => getPageMetadata("Agent Earnings");

export default function AgentEarningsPage() {
  return <AgentEarningsClient />;
}
