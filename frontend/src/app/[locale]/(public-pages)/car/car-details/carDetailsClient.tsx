"use client";

import dynamic from "next/dynamic";

const CarDetailsView = dynamic(() => import("@/views/car/car-details/carDetails"), { ssr: false });

export default function CarDetailsClient() {
  return <CarDetailsView />;
}
