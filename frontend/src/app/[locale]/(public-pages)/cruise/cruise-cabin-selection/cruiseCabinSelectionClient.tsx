"use client";

import dynamic from "next/dynamic";

const CruiseCabinSelectionView = dynamic(() => import("@/views/cruise/cruise-cabin-selection/cruiseCabinSelection"), { ssr: false });

export default function CruiseCabinSelectionClient() {
  return <CruiseCabinSelectionView />;
}
