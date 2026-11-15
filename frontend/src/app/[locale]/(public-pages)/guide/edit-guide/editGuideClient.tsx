"use client";

import dynamic from "next/dynamic";

const EditGuideView = dynamic(() => import("@/views/guide/edit-guide/editGuide"), { ssr: false });

export default function EditGuideClient() {
  return <EditGuideView />;
}
