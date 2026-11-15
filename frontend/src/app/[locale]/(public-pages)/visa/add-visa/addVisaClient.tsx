"use client";

import dynamic from "next/dynamic";

const AddVisaView = dynamic(() => import("@/views/visa/add-visa/addVisa"), { ssr: false });

export default function AddVisaClient() {
  return <AddVisaView />;
}
