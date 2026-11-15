"use client";

import dynamic from "next/dynamic";

const CompareView = dynamic(() => import("@/views/pages/compare/compare"), { ssr: false });

export default function CompareClient() {
  return <CompareView />;
}
