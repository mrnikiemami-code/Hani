"use client";

import dynamic from "next/dynamic";

const EditTourView = dynamic(() => import("@/views/agent-dashboard/listing/edit-tour/editTour"), { ssr: false });

export default function EditTourClient() {
  return <EditTourView />;
}
