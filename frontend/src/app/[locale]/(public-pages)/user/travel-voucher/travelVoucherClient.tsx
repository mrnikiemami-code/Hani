"use client";

import dynamic from "next/dynamic";

const TravelVoucherView = dynamic(() => import("@/views/user-dashboard/travel-voucher/travelVoucher"), { ssr: false });

export default function TravelVoucherClient() {
  return <TravelVoucherView />;
}
