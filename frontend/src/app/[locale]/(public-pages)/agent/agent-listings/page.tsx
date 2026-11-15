import { getPageMetadata } from "@/config/metadata";
import AgentListingsClient from "./agentListingsClient";

export const generateMetadata = () => getPageMetadata("Agent Listings");

export default function AgentListingsPage() {
  return <AgentListingsClient />;
}
