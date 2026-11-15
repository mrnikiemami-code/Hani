"use client";

import dynamic from "next/dynamic";

const VisaListView = dynamic(() => import("@/views/visa/visa-list/visaList"), { ssr: false });

export default function VisaListClient() {
  return <VisaListView />;
}
