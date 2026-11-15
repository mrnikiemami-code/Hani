"use client";

import dynamic from "next/dynamic";

const PricingPlanTwoView = dynamic(() => import("@/views/pages/pricing-plan/PricingPlanTwo"), { ssr: false });

export default function PricingPlanTwoClient() {
  return <PricingPlanTwoView />;
}
