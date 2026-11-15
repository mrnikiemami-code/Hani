"use client";

import dynamic from "next/dynamic";

const AgentPlansView = dynamic(() => import("@/views/agent-dashboard/agent-plan/agentPlan"), { ssr: false });

export default function AgentPlansClient() {
  return <AgentPlansView />;
}
