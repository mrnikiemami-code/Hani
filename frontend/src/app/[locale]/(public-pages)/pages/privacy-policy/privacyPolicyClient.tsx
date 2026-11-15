"use client";

import dynamic from "next/dynamic";

const PrivacyPolicyView = dynamic(() => import("@/views/pages/privacy-policy/privacyPolicy"), { ssr: false });

export default function PrivacyPolicyClient() {
  return <PrivacyPolicyView />;
}
