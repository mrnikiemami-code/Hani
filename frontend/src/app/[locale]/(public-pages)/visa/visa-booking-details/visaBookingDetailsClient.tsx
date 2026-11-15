"use client";

import dynamic from "next/dynamic";

const VisaBookingDetailsView = dynamic(() => import("@/views/visa/visa-booking-details/visaBookingDetails"), { ssr: false });

export default function VisaBookingDetailsClient() {
  return <VisaBookingDetailsView />;
}
