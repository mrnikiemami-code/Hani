"use client";

import dynamic from "next/dynamic";

const Index5View = dynamic(() => import("@/views/home-three/homeThree"), { ssr: false });

export default function Index5Client() {
  return <Index5View />;
}
