"use client";

import dynamic from "next/dynamic";

const CustomerAllBookingsView = dynamic(() => import("@/views/user-dashboard/my-booking/all-bookings/userAllBookings"), { ssr: false });

export default function CustomerAllBookingsClient() {
  return <CustomerAllBookingsView />;
}
