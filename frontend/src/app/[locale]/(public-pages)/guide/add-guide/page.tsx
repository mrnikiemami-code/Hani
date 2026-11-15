import { getPageMetadata } from "@/config/metadata";
import AddGuideClient from "./addGuideClient";

export const generateMetadata = () => getPageMetadata("Add Guide");

export default function AddGuidePage() {
  return <AddGuideClient />;
}
