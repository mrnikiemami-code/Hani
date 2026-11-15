"use client";

import dynamic from "next/dynamic";

const CustomerCancellationRefundsView = dynamic(() => import("@/views/user-dashboard/customer-cancellation-refunds/customerCancellationRefunds"), { ssr: false });

export default function CustomerCancellationRefundsClient() {
  return <CustomerCancellationRefundsView />;
}
