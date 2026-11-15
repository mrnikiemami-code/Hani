"use client";

import dynamic from "next/dynamic";

const Index12View = dynamic(() => import("@/views/home-twelve/homeTwelve"), { ssr: false });

export default function Index12Client() {
  return <Index12View />;
}
