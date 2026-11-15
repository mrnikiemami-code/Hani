import { getPageMetadata } from "@/config/metadata";
import AgentReviewClient from "./agentReviewClient";

export const generateMetadata = () => getPageMetadata("Agent Review");

export default function AgentReviewPage() {
  return <AgentReviewClient />;
}
