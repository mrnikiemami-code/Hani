"use client";

import dynamic from "next/dynamic";

const GalleryView = dynamic(() => import("@/views/pages/gallery/Gallery"), { ssr: false });

export default function GalleryClient() {
  return <GalleryView />;
}
