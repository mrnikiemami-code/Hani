"use client";

import dynamic from "next/dynamic";

const AgentSettingsView = dynamic(() => import("@/views/agent-dashboard/settings/agentSettings"), { ssr: false });

export default function AgentSettingsClient() {
  return <AgentSettingsView />;
}
