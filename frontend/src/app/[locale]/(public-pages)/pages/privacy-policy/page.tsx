import { getPageMetadata } from "@/config/metadata";
import PrivacyPolicyClient from "./privacyPolicyClient";

export const generateMetadata = () => getPageMetadata("Privacy Policy");

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
