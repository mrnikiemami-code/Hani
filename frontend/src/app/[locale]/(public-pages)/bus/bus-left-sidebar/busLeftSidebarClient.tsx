"use client";

import dynamic from "next/dynamic";

const BusLeftSidebarView = dynamic(() => import("@/views/bus/bus-list/busListLeftSidebar"), { ssr: false });

export default function BusLeftSidebarClient() {
  return <BusLeftSidebarView />;
}
