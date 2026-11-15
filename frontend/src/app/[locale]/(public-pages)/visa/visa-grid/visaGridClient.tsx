"use client";

import dynamic from "next/dynamic";

const VisaGridView = dynamic(() => import("@/views/visa/visa-grid/visaGrid"), { ssr: false });

export default function VisaGridClient() {
  return <VisaGridView />;
}
