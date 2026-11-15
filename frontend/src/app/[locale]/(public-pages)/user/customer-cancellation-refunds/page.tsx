import { getPageMetadata } from "@/config/metadata";
import CustomerCancellationRefundsClient from "./customerCancellationRefundsClient";

export const generateMetadata = () => getPageMetadata("Customer Cancellation Refunds");

export default function CustomerCancellationRefundsPage() {
  return <CustomerCancellationRefundsClient />;
}
