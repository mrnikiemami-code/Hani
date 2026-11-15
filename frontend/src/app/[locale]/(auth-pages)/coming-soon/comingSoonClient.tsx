"use client";

import dynamic from "next/dynamic";

const ComingSoonView = dynamic(() => import("@/views/pages/coming-soon/comingSoon"), { ssr: false });

export default function ComingSoonClient() {
  return <ComingSoonView />;
}
