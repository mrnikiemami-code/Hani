"use client";

import dynamic from "next/dynamic";

const CarGridView = dynamic(() => import("@/views/car/car-grid/carGrid"), { ssr: false });

export default function CarGridClient() {
  return <CarGridView />;
}
