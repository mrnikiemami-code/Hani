"use client";

import dynamic from "next/dynamic";

const Index8View = dynamic(() => import("@/views/home-six/homeSix"), { ssr: false });

export default function Index8Client() {
  return <Index8View />;
}
