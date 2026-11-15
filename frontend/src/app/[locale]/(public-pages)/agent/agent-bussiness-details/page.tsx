import { getPageMetadata } from "@/config/metadata";
import AgentBussinessDetailsClient from "./agentBussinessDetailsClient";

export const generateMetadata = () => getPageMetadata("Agent Bussiness Details");

export default function AgentBussinessDetailsPage() {
  return <AgentBussinessDetailsClient />;
}
