"use client";

import dynamic from "next/dynamic";

const PricingPlanView = dynamic(() => import("@/views/pages/pricing-plan/PricingPlan"), { ssr: false });

export default function PricingPlanClient() {
  return <PricingPlanView />;
}
