"use client";

import dynamic from "next/dynamic";

const ActivityListView = dynamic(() => import("@/views/activity/activity-list/activityList"), { ssr: false });

export default function ActivityListClient() {
  return <ActivityListView />;
}
