"use client";

import dynamic from "next/dynamic";

const AddBusView = dynamic(() => import("@/views/bus/add-bus/addBus"), { ssr: false });

export default function AddBusClient() {
  return <AddBusView />;
}
