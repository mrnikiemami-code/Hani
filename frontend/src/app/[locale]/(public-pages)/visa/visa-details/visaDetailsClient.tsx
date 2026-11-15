"use client";

import dynamic from "next/dynamic";

const VisaDetailsView = dynamic(() => import("@/views/visa/visa-details/visaDetails"), { ssr: false });

export default function VisaDetailsClient() {
  return <VisaDetailsView />;
}
