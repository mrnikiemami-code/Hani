"use client";

import dynamic from "next/dynamic";

const PreferencesSettingsView = dynamic(() => import("@/views/user-dashboard/settings/preferencesSettings"), { ssr: false });

export default function PreferencesSettingsClient() {
  return <PreferencesSettingsView />;
}
