"use client";

import dynamic from "next/dynamic";

const ActivityDetailsView = dynamic(() => import("@/views/activity/activity-details/activityDetails"), { ssr: false });

export default function ActivityDetailsClient() {
  return <ActivityDetailsView />;
}
