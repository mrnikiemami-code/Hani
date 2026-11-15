"use client";

import dynamic from "next/dynamic";

const AddActivityView = dynamic(() => import("@/views/activity/add-activity/addActivity"), { ssr: false });

export default function AddActivityClient() {
  return <AddActivityView />;
}
