import { getPageMetadata } from "@/config/metadata";
import PricingPlanTwoClient from "./pricingPlanTwoClient";

export const generateMetadata = () => getPageMetadata("Pricing Plan Two");

export default function PricingPlanTwoPage() {
  return <PricingPlanTwoClient />;
}
