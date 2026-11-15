import { getPageMetadata } from "@/config/metadata";
import EditGuideClient from "./editGuideClient";

export const generateMetadata = () => getPageMetadata("Edit Guide");

export default function EditGuidePage() {
  return <EditGuideClient />;
}
