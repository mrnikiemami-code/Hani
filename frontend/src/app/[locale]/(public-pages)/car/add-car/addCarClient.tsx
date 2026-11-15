"use client";

import dynamic from "next/dynamic";

const AddCarView = dynamic(() => import("@/views/car/add-car/addCar"), { ssr: false });

export default function AddCarClient() {
  return <AddCarView />;
}
