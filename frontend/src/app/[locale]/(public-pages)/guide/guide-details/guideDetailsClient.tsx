"use client";

import dynamic from "next/dynamic";

const GuideDetailsView = dynamic(() => import("@/views/guide/guide-details/guideDetails"), { ssr: false });

export default function GuideDetailsClient() {
  return <GuideDetailsView />;
}
