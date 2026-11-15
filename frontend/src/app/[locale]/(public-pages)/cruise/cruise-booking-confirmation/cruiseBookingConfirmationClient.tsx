"use client";

import dynamic from "next/dynamic";

const CruiseBookingConfirmationView = dynamic(() => import("@/views/cruise/cruise-booking-confirmation/cruiseBookingConfirmation"), { ssr: false });

export default function CruiseBookingConfirmationClient() {
  return <CruiseBookingConfirmationView />;
}
