import { getPageMetadata } from "@/config/metadata";
import PricingPlanClient from "./pricingPlanClient";

export const generateMetadata = () => getPageMetadata("Pricing Plan");

export default function PricingPlanPage() {
  return <PricingPlanClient />;
}
