"use client";

import dynamic from "next/dynamic";

const Index11View = dynamic(() => import("@/views/home-eleven/homeEleven"), { ssr: false });

export default function Index11Client() {
  return <Index11View />;
}
