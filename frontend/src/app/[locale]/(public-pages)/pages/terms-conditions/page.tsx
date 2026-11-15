import { getPageMetadata } from "@/config/metadata";
import TermsConditionsClient from "./termsConditionsClient";

export const generateMetadata = () => getPageMetadata("Terms Conditions");

export default function TermsConditionsPage() {
  return <TermsConditionsClient />;
}
