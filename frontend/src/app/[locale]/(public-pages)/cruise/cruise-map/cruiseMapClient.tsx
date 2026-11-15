"use client";

import dynamic from "next/dynamic";

const CruiseMapView = dynamic(() => import("@/views/cruise/cruise-map/cruiseMap"), { ssr: false });

export default function CruiseMapClient() {
  return <CruiseMapView />;
}
