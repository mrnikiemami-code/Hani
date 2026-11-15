"use client";

import dynamic from "next/dynamic";

const DestinationView = dynamic(() => import("@/views/pages/destination/destination"), { ssr: false });

export default function DestinationClient() {
  return <DestinationView />;
}
