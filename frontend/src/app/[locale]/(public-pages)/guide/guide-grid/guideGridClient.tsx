"use client";

import dynamic from "next/dynamic";

const GuideGridView = dynamic(() => import("@/views/guide/guide-grid/guideGrid"), { ssr: false });

export default function GuideGridClient() {
  return <GuideGridView />;
}
