"use client";

import dynamic from "next/dynamic";

const CustomerVisaBookingView = dynamic(() => import("@/views/user-dashboard/my-booking/visa/visaBooking"), { ssr: false });

export default function CustomerVisaBookingClient() {
  return <CustomerVisaBookingView />;
}
