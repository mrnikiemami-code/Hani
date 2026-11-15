"use client";

import dynamic from "next/dynamic";

const ActivityMapView = dynamic(() => import("@/views/activity/activity-map/activityMap"), { ssr: false });

export default function ActivityMapClient() {
  return <ActivityMapView />;
}
