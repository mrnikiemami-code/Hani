"use client";

import dynamic from "next/dynamic";

const CustomerLoyaltyPointsView = dynamic(() => import("@/views/user-dashboard/offer-and-rewards/loyalty-points/loyaltyPoints"), { ssr: false });

export default function CustomerLoyaltyPointsClient() {
  return <CustomerLoyaltyPointsView />;
}
