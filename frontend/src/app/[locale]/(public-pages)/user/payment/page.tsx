import { getPageMetadata } from "@/config/metadata";
import PaymentClient from "./paymentClient";

export const generateMetadata = () => getPageMetadata("Payment");

export default function PaymentPage() {
  return <PaymentClient />;
}
