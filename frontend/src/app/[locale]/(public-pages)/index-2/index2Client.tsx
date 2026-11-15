"use client";

import dynamic from "next/dynamic";

const Index2View = dynamic(() => import("@/views/home-service-two/homeServiceTwo"), { ssr: false });

export default function Index2Client() {
  return <Index2View />;
}
