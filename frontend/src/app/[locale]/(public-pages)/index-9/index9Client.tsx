"use client";

import dynamic from "next/dynamic";

const Index9View = dynamic(() => import("@/views/home-seven/homeSeven"), { ssr: false });

export default function Index9Client() {
  return <Index9View />;
}
