"use client";

import dynamic from "next/dynamic";

const Index1View = dynamic(() => import("@/views/home-service-one/homeServiceOne"), { ssr: false });

export default function Index1Client() {
  return <Index1View />;
}
