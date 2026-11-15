"use client";

import dynamic from "next/dynamic";

const CarMapView = dynamic(() => import("@/views/car/car-map/carMap"), { ssr: false });

export default function CarMapClient() {
  return <CarMapView />;
}
