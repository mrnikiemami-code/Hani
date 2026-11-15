"use client";

import dynamic from "next/dynamic";

const IntegrationSettingsView = dynamic(() => import("@/views/user-dashboard/settings/integrationSettings"), { ssr: false });

export default function IntegrationSettingsClient() {
  return <IntegrationSettingsView />;
}
