"use client";

import dynamic from "next/dynamic";

const AgentAccountSettingsView = dynamic(() => import("@/views/agent-dashboard/settings/agent-account-settings/agentAccountSettings"), { ssr: false });

export default function AgentAccountSettingsClient() {
  return <AgentAccountSettingsView />;
}
