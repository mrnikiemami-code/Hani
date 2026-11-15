"use client";

import dynamic from "next/dynamic";

const CustomerHotelBookingView = dynamic(() => import("@/views/user-dashboard/my-booking/hotels/userHotelsBooking"), { ssr: false });

export default function CustomerHotelBookingClient() {
  return <CustomerHotelBookingView />;
}
