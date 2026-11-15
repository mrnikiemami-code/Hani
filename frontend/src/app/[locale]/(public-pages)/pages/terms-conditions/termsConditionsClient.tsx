"use client";

import dynamic from "next/dynamic";

const TermsConditionsView = dynamic(() => import("@/views/pages/terms-conditions/termsConditions"), { ssr: false });

export default function TermsConditionsClient() {
  return <TermsConditionsView />;
}
