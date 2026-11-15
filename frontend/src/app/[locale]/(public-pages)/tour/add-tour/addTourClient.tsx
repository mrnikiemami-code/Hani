"use client";

import dynamic from "next/dynamic";

const AddTourView = dynamic(() => import("@/views/tour/add-tour/addTour"), { ssr: false });

export default function AddTourClient() {
  return <AddTourView />;
}
