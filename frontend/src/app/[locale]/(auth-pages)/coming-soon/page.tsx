import { getPageMetadata } from "@/config/metadata";
import ComingSoonClient from "./comingSoonClient";

export const generateMetadata = () => getPageMetadata("Coming Soon");

export default function ComingSoonPage() {
  return <ComingSoonClient />;
}
