"use client";

import dynamic from "next/dynamic";

const AboutUsView = dynamic(() => import("@/views/pages/about-us/about_us"), { ssr: false });

export default function AboutUsClient() {
  return <AboutUsView />;
}
