"use client";

import dynamic from "next/dynamic";

const Index4View = dynamic(() => import("@/views/home-two/homeTwo"), { ssr: false });

export default function Index4Client() {
  return <Index4View />;
}
