"use client";

import dynamic from "next/dynamic";

const CustomerTripDetailsView = dynamic(() => import("@/views/user-dashboard/trip-details/userTripDetails"), { ssr: false });

export default function CustomerTripDetailsClient() {
  return <CustomerTripDetailsView />;
}
