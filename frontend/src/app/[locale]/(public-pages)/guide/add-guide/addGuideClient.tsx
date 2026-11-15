"use client";

import dynamic from "next/dynamic";

const AddGuideView = dynamic(() => import("@/views/guide/add-guide/addGuide"), { ssr: false });

export default function AddGuideClient() {
  return <AddGuideView />;
}
