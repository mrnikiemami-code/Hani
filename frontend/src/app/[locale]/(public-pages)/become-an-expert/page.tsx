import { getPageMetadata } from "@/config/metadata";
import BecomeAnExpertClient from "./becomeAnExpertClient";

export const generateMetadata = () => getPageMetadata("Become An Expert");

export default function BecomeAnExpertPage() {
  return <BecomeAnExpertClient />;
}
