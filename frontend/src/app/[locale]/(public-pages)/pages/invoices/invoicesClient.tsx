"use client";

import dynamic from "next/dynamic";

const InvoicesView = dynamic(() => import("@/views/pages/invoices/invoices"), { ssr: false });

export default function InvoicesClient() {
  return <InvoicesView />;
}
