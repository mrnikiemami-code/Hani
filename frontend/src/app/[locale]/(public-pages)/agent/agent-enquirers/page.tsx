import { getPageMetadata } from "@/config/metadata";
import AgentEnquirersClient from "./agentEnquirersClient";

export const generateMetadata = () => getPageMetadata("Agent Enquirers");

export default function AgentEnquirersPage() {
  return <AgentEnquirersClient />;
}
