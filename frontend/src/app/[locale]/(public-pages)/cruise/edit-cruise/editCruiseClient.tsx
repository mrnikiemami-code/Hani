"use client";

import dynamic from "next/dynamic";

const EditCruiseView = dynamic(() => import("@/views/agent-dashboard/listing/edit-cruise/editCruise"), { ssr: false });

export default function EditCruiseClient() {
  return <EditCruiseView />;
}
