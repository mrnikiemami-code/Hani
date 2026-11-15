import { getPageMetadata } from "@/config/metadata";
import CustomerReferralProgramClient from "./customerReferralProgramClient";

export const generateMetadata = () => getPageMetadata("Customer Referral Program");

export default function CustomerReferralProgramPage() {
  return <CustomerReferralProgramClient />;
}
