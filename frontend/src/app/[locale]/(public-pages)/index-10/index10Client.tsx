"use client";

import dynamic from "next/dynamic";

const Index10View = dynamic(() => import("@/views/home-ten/homeTen"), { ssr: false });

export default function Index10Client() {
  return <Index10View />;
}
