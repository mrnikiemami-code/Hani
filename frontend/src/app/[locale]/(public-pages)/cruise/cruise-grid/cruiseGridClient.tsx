"use client";

import dynamic from "next/dynamic";

const CruiseGridView = dynamic(() => import("@/views/cruise/cruise-grid/curiseGrid"), { ssr: false });

export default function CruiseGridClient() {
  return <CruiseGridView />;
}
