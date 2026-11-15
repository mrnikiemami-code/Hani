"use client";

import dynamic from "next/dynamic";

const VisaRequirementsView = dynamic(() => import("@/views/visa/visa-requirements/visaRequirement"), { ssr: false });

export default function VisaRequirementsClient() {
  return <VisaRequirementsView />;
}
