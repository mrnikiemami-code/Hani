"use client";

import dynamic from "next/dynamic";

const NotificationsView = dynamic(() => import("@/views/user-dashboard/notification/notification"), { ssr: false });

export default function NotificationsClient() {
  return <NotificationsView />;
}
