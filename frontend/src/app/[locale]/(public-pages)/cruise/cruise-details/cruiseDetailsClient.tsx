"use client";

import dynamic from "next/dynamic";

const CruiseDetailsView = dynamic(() => import("@/views/cruise/cruise-details/curiseDetails"), { ssr: false });

export default function CruiseDetailsClient() {
  return <CruiseDetailsView />;
}
