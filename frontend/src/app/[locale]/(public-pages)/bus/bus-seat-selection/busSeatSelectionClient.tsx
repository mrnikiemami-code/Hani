"use client";

import dynamic from "next/dynamic";

const BusSeatSelectionView = dynamic(() => import("@/views/bus/bus-seat-selection/busSeatSelection"), { ssr: false });

export default function BusSeatSelectionClient() {
  return <BusSeatSelectionView />;
}
