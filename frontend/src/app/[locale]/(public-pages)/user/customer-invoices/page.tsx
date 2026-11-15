import { getPageMetadata } from "@/config/metadata";
import CustomerInvoicesClient from "./customerInvoicesClient";

export const generateMetadata = () => getPageMetadata("Customer Invoices");

export default function CustomerInvoicesPage() {
  return <CustomerInvoicesClient />;
}
