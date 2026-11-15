"use client";

import dynamic from "next/dynamic";

const EditActivityView = dynamic(() => import("@/views/activity/edit-activity/editActivity"), { ssr: false });

export default function EditActivityClient() {
  return <EditActivityView />;
}
