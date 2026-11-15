"use client";

import dynamic from "next/dynamic";

const EditFlightView = dynamic(() => import("@/views/agent-dashboard/listing/edit-flight/editFlight"), { ssr: false });

export default function EditFlightClient() {
  return <EditFlightView />;
}
