"use client";

import dynamic from "next/dynamic";

const CustomerCouponsView = dynamic(() => import("@/views/user-dashboard/offer-and-rewards/coupons/coupons"), { ssr: false });

export default function CustomerCouponsClient() {
  return <CustomerCouponsView />;
}
