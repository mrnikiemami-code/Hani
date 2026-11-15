"use client";

import dynamic from "next/dynamic";

const Index3View = dynamic(() => import("@/views/home-one/homeOne"), { ssr: false });

export default function Index3Client() {
  return <Index3View />;
}
