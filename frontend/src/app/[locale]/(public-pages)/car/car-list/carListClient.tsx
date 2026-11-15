"use client";

import dynamic from "next/dynamic";

const CarListView = dynamic(() => import("@/views/car/car-list/carList"), { ssr: false });

export default function CarListClient() {
  return <CarListView />;
}
