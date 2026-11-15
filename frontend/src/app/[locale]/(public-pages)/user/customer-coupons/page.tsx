import { getPageMetadata } from "@/config/metadata";
import CustomerCouponsClient from "./customerCouponsClient";

export const generateMetadata = () => getPageMetadata("Customer Coupons");

export default function CustomerCouponsPage() {
  return <CustomerCouponsClient />;
}
