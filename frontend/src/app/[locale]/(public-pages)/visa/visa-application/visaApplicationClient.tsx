"use client";

import dynamic from "next/dynamic";

const VisaApplicationView = dynamic(() => import("@/views/visa/visa-application/visaApplication"), { ssr: false });

export default function VisaApplicationClient() {
  return <VisaApplicationView />;
}
