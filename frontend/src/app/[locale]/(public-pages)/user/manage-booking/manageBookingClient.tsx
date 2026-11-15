"use client";

import dynamic from "next/dynamic";

const ManageBookingView = dynamic(() => import("@/views/user-dashboard/manage-booking/manageBooking"), { ssr: false });

export default function ManageBookingClient() {
  return <ManageBookingView />;
}
