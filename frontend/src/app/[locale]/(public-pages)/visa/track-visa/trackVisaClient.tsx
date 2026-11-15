"use client";

import dynamic from "next/dynamic";

const TrackVisaView = dynamic(() => import("@/views/visa/track-visa/trackVisa"), { ssr: false });

export default function TrackVisaClient() {
  return <TrackVisaView />;
}
