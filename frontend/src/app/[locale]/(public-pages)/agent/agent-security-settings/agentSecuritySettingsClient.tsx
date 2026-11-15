"use client";

import dynamic from "next/dynamic";

const AgentSecuritySettingsView = dynamic(() => import("@/views/agent-dashboard/settings/agent-security-settings/agentSecuritySettings"), { ssr: false });

export default function AgentSecuritySettingsClient() {
  return <AgentSecuritySettingsView />;
}
