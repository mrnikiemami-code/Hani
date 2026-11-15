"use client";

import dynamic from "next/dynamic";

const CustomerRewardHistoryView = dynamic(() => import("@/views/user-dashboard/offer-and-rewards/rewards-history/rewardsHistory"), { ssr: false });

export default function CustomerRewardHistoryClient() {
  return <CustomerRewardHistoryView />;
}
