"use client";

import dynamic from "next/dynamic";

const Index7View = dynamic(() => import("@/views/home-five/homeFive"), { ssr: false });

export default function Index7Client() {
  return <Index7View />;
}
