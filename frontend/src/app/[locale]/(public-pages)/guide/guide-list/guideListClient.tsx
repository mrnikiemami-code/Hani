"use client";

import dynamic from "next/dynamic";

const GuideListView = dynamic(() => import("@/views/guide/guide-list/guideList"), { ssr: false });

export default function GuideListClient() {
  return <GuideListView />;
}
