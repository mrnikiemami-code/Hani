"use client";

import dynamic from "next/dynamic";

const EditBusView = dynamic(() => import("@/views/bus/edit-bus/editBus"), { ssr: false });

export default function EditBusClient() {
  return <EditBusView />;
}
