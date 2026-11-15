import { getPageMetadata } from "@/config/metadata";
import CustomerRewardHistoryClient from "./customerRewardHistoryClient";

export const generateMetadata = () => getPageMetadata("Customer Reward History");

export default function CustomerRewardHistoryPage() {
  return <CustomerRewardHistoryClient />;
}
