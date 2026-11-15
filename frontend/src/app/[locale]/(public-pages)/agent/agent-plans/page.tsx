import { getPageMetadata } from "@/config/metadata";
import AgentPlansClient from "./agentPlansClient";

export const generateMetadata = () => getPageMetadata("Agent Plans");

export default function AgentPlansPage() {
  return <AgentPlansClient />;
}
