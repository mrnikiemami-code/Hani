"use client";

import dynamic from "next/dynamic";

const EditCarView = dynamic(() => import("@/views/agent-dashboard/listing/edit-car/editCar"), { ssr: false });

export default function EditCarClient() {
  return <EditCarView />;
}
