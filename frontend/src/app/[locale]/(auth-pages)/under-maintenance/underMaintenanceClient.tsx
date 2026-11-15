"use client";

import dynamic from "next/dynamic";

const UnderMaintenanceView = dynamic(() => import("@/views/pages/under-maintenance/UnderMaintenance"), { ssr: false });

export default function UnderMaintenanceClient() {
  return <UnderMaintenanceView />;
}
