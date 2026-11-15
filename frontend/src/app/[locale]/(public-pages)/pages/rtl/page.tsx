import { getPageMetadata } from "@/config/metadata";
import RtlClient from "./rtlClient";

export const generateMetadata = () => getPageMetadata("Rtl");

export default function RtlPage() {
  return <RtlClient />;
}
