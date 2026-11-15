"use client";

import dynamic from "next/dynamic";

const AgentNotificationSettingsView = dynamic(() => import("@/views/agent-dashboard/settings/agent-notification-settings/agentNotificationSettings"), { ssr: false });

export default function AgentNotificationSettingsClient() {
  return <AgentNotificationSettingsView />;
}
