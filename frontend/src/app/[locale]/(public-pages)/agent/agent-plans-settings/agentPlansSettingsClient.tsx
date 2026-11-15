"use client";

import dynamic from "next/dynamic";

const AgentPlansSettingsView = dynamic(() => import("@/views/agent-dashboard/settings/agent-plan-settings/agentPlanSettings"), { ssr: false });

export default function AgentPlansSettingsClient() {
  return <AgentPlansSettingsView />;
}
