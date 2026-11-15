"use client";

import dynamic from "next/dynamic";

const StyleGuideView = dynamic(() => import("@/views/pages/style-guide/styleGuide"), { ssr: false });

export default function StyleGuideClient() {
  return <StyleGuideView />;
}
