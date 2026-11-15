"use client";

import dynamic from "next/dynamic";

const AgentChatView = dynamic(() => import("@/views/agent-dashboard/agent-message/agentChat"), { ssr: false });

export default function AgentChatClient() {
  return <AgentChatView />;
}
