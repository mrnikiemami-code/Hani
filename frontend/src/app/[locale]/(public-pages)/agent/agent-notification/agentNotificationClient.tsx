"use client";

import dynamic from "next/dynamic";

const AgentNotificationView = dynamic(() => import("@/views/agent-dashboard/agent-notification/agentNotification"), { ssr: false });

export default function AgentNotificationClient() {
  return <AgentNotificationView />;
}
