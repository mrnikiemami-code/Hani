"use client";

import dynamic from "next/dynamic";

const ProfileSettingsView = dynamic(() => import("@/views/user-dashboard/settings/profileSettings"), { ssr: false });

export default function ProfileSettingsClient() {
  return <ProfileSettingsView />;
}
