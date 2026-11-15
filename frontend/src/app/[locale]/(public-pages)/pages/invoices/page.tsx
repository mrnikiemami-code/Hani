import { getPageMetadata } from "@/config/metadata";
import InvoicesClient from "./invoicesClient";

export const generateMetadata = () => getPageMetadata("Invoices");

export default function InvoicesPage() {
  return <InvoicesClient />;
}
