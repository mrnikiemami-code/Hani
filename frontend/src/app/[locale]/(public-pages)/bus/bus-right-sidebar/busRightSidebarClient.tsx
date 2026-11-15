"use client";

import dynamic from "next/dynamic";

const BusRightSidebarView = dynamic(() => import("@/views/bus/bus-list/busListRightSidebar"), { ssr: false });

export default function BusRightSidebarClient() {
  return <BusRightSidebarView />;
}
