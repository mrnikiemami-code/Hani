"use client";

import dynamic from "next/dynamic";

const TourListView = dynamic(() => import("@/views/tour/tour-list/tourList"), { ssr: false });

export default function TourListClient() {
  return <TourListView />;
}
