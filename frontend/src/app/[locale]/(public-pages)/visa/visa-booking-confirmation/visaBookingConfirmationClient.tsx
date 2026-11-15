"use client";

import dynamic from "next/dynamic";

const VisaBookingConfirmationView = dynamic(() => import("@/views/visa/visa-booking-confirmation/visaBookingConfirmation"), { ssr: false });

export default function VisaBookingConfirmationClient() {
  return <VisaBookingConfirmationView />;
}
