"use client";

import dynamic from "next/dynamic";

const BusListView = dynamic(() => import("@/views/bus/bus-list/busList"), { ssr: false });

export default function BusListClient() {
  return <BusListView />;
}
