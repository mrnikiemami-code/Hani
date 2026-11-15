"use client";

import dynamic from "next/dynamic";

const TourDetailsView = dynamic(() => import("@/views/tour/tour-details/tourDetails"), { ssr: false });

export default function TourDetailsClient() {
  return <TourDetailsView />;
}
