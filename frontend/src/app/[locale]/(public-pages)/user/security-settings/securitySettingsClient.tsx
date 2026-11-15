"use client";

import dynamic from "next/dynamic";

const SecuritySettingsView = dynamic(() => import("@/views/user-dashboard/settings/securitySettings"), { ssr: false });

export default function SecuritySettingsClient() {
  return <SecuritySettingsView />;
}
