"use client";

import dynamic from "next/dynamic";

const BusBookingConfirmationView = dynamic(() => import("@/views/bus/bus-booking-confirmation/busBookingConfirmation"), { ssr: false });

export default function BusBookingConfirmationClient() {
  return <BusBookingConfirmationView />;
}
