"use client";

import dynamic from "next/dynamic";

const NotificationSettingsView = dynamic(() => import("@/views/user-dashboard/settings/notificationSettings"), { ssr: false });

export default function NotificationSettingsClient() {
  return <NotificationSettingsView />;
}
