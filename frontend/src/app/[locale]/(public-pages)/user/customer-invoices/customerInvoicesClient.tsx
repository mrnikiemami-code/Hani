"use client";

import dynamic from "next/dynamic";

const CustomerInvoicesView = dynamic(() => import("@/views/user-dashboard/customer-invoices/customerInvoices"), { ssr: false });

export default function CustomerInvoicesClient() {
  return <CustomerInvoicesView />;
}
