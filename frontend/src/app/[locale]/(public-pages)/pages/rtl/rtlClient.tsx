"use client";

import dynamic from "next/dynamic";

const RtlView = dynamic(() => import("@/views/pages/rtl/home-one/homeOne"), { ssr: false });

export default function RtlClient() {
  return <RtlView />;
}
