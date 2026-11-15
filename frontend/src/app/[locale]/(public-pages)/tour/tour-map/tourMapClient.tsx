"use client";

import dynamic from "next/dynamic";

const TourMapView = dynamic(() => import("@/views/tour/tour-map/tourMap"), { ssr: false });

export default function TourMapClient() {
  return <TourMapView />;
}
