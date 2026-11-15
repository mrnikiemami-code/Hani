"use client";

import dynamic from "next/dynamic";

const Index6View = dynamic(() => import("@/views/home-four/homeFour"), { ssr: false });

export default function Index6Client() {
  return <Index6View />;
}
