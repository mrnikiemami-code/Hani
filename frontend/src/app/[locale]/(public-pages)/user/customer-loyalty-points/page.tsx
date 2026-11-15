import { getPageMetadata } from "@/config/metadata";
import CustomerLoyaltyPointsClient from "./customerLoyaltyPointsClient";

export const generateMetadata = () => getPageMetadata("Customer Loyalty Points");

export default function CustomerLoyaltyPointsPage() {
  return <CustomerLoyaltyPointsClient />;
}
