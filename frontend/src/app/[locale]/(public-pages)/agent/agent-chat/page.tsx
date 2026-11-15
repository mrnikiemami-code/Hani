import { getPageMetadata } from "@/config/metadata";
import AgentChatClient from "./agentChatClient";

export const generateMetadata = () => getPageMetadata("Agent Chat");

export default function AgentChatPage() {
  return <AgentChatClient />;
}
