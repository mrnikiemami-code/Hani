"use client";

import dynamic from "next/dynamic";

const CruiseListView = dynamic(() => import("@/views/cruise/cruise-list/cruiseList"), { ssr: false });

export default function CruiseListClient() {
  return <CruiseListView />;
}
