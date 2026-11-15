"use client";

import dynamic from "next/dynamic";

const ActivityGridView = dynamic(() => import("@/views/activity/activity-grid/activityGrid"), { ssr: false });

export default function ActivityGridClient() {
  return <ActivityGridView />;
}
