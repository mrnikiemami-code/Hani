"use client";

import dynamic from "next/dynamic";

const DestinationDetailsView = dynamic(() => import("@/views/pages/destination-details/DestrinationDetails"), { ssr: false });

export default function DestinationDetailsClient() {
  return <DestinationDetailsView />;
}
