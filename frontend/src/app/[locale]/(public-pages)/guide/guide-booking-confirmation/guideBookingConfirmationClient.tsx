"use client";

import dynamic from "next/dynamic";

const GuideBookingConfirmationView = dynamic(() => import("@/views/guide/guide-booking-confirmation/guideBookingConfirmation"), { ssr: false });

export default function GuideBookingConfirmationClient() {
  return <GuideBookingConfirmationView />;
}
