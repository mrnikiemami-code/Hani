"use client";

import dynamic from "next/dynamic";

const AddCruiseView = dynamic(() => import("@/views/cruise/add-cruise/addCruise"), { ssr: false });

export default function AddCruiseClient() {
  return <AddCruiseView />;
}
