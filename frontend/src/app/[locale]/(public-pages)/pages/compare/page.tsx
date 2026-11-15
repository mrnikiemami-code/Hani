import { getPageMetadata } from "@/config/metadata";
import CompareClient from "./compareClient";

export const generateMetadata = () => getPageMetadata("Compare");

export default function ComparePage() {
  return <CompareClient />;
}
