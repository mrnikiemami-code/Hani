"use client";

import dynamic from "next/dynamic";

const CustomerReferralProgramView = dynamic(() => import("@/views/user-dashboard/offer-and-rewards/referral-program/referralProgram"), { ssr: false });

export default function CustomerReferralProgramClient() {
  return <CustomerReferralProgramView />;
}
