"use client";

import dynamic from "next/dynamic";

const BookingConfirmationView = dynamic(() => import("@/views/pages/booking-confirmation/bookingConfirmation"), { ssr: false });

export default function BookingConfirmationClient() {
  return <BookingConfirmationView />;
}
