"use client";

import dynamic from "next/dynamic";

const AddHotelView = dynamic(() => import("@/views/hotel/add-hotel/addHotel"), { ssr: false });

export default function AddHotelClient() {
  return <AddHotelView />;
}
