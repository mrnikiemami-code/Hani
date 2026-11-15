"use client";

import dynamic from "next/dynamic";

const GuideBookingView = dynamic(() => import("@/views/guide/guide-booking/guideBooking"), { ssr: false });

export default function GuideBookingClient() {
  return <GuideBookingView />;
}
