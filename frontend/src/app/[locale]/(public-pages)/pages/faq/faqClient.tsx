"use client";

import dynamic from "next/dynamic";

const FaqView = dynamic(() => import("@/views/pages/faq/FAQ"), { ssr: false });

export default function FaqClient() {
  return <FaqView />;
}
