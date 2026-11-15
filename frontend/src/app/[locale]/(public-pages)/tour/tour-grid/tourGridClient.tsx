"use client";

import dynamic from "next/dynamic";

const TourGridView = dynamic(() => import("@/views/tour/tour-grid/tourGrid"), { ssr: false });

export default function TourGridClient() {
  return <TourGridView />;
}
