"use client";

import dynamic from "next/dynamic";

const PaymentView = dynamic(() => import("@/views/user-dashboard/payment/payment"), { ssr: false });

export default function PaymentClient() {
  return <PaymentView />;
}
