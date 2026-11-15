"use client";

import dynamic from "next/dynamic";

const EditHotelView = dynamic(() => import("@/views/agent-dashboard/listing/edit-hotel/editHotel"), { ssr: false });

export default function EditHotelClient() {
  return <EditHotelView />;
}
